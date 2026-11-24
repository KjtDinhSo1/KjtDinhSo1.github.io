/* API nhận tin nhắn từ form Liên hệ (chạy trên Vercel: POST /api/contact)
   1. Kiểm tra dữ liệu, chặn bot và gửi dồn dập (tối đa 5 tin / 10 phút / IP)
   2. Lưu vào bảng messages trên PostgreSQL (Neon)
   3. Gửi mail về Gmail của bạn bằng Nodemailer (bấm Trả lời là trả lời thẳng người gửi)
   Biến môi trường cần đặt trên Vercel: DATABASE_URL, GMAIL_USER, GMAIL_APP_PASSWORD
   Tuỳ chọn: MAIL_TO (mặc định = GMAIL_USER), ALLOWED_ORIGINS (các trang được gọi API, cách nhau dấu phẩy) */
const { neon } = require("@neondatabase/serverless");
const nodemailer = require("nodemailer");

const ORIGINS = (process.env.ALLOWED_ORIGINS || "https://kjtdinhso1.github.io,http://localhost:5500").split(",").map(s => s.trim());
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let db, mailer, schemaReady;

const getDb = () => (db ??= neon(process.env.DATABASE_URL));
const getMailer = () => (mailer ??= nodemailer.createTransport({
  service: "gmail", auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
}));
// Tạo bảng ở lần gọi đầu tiên sau mỗi lần server khởi động; câu lệnh an toàn khi bảng đã có
const ensureSchema = sql => (schemaReady ??= sql`
  CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    name       TEXT        NOT NULL,
    email      TEXT        NOT NULL,
    message    TEXT        NOT NULL,
    ip         TEXT,
    user_agent TEXT,
    emailed    BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`.catch(e => { schemaReady = null; throw e; }));

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const send = (res, status, data) => {
  res.statusCode = status; res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
};
async function readBody(req) {
  if (req.body !== undefined) return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;  // Vercel đã đọc sẵn
  let raw = ""; for await (const chunk of req) { raw += chunk; if (raw.length > 20000) throw new Error("too large"); }
  return JSON.parse(raw || "{}");
}

/** Trả về { field, error } đầu tiên sai, hoặc { data } đã làm sạch */
function validate(b) {
  const name = String(b.name ?? "").trim(), email = String(b.email ?? "").trim(), message = String(b.message ?? "").trim();
  if (!name || name.length > 100) return { field: "name", error: "Bạn nhập tên (tối đa 100 ký tự) nhé." };
  if (!EMAIL_RE.test(email) || email.length > 200) return { field: "email", error: "Email chưa đúng định dạng." };
  if (!message || message.length > 5000) return { field: "message", error: "Bạn nhập lời nhắn (tối đa 5000 ký tự) nhé." };
  return { data: { name, email, message } };
}

async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ORIGINS.includes(origin)) { res.setHeader("Access-Control-Allow-Origin", origin); res.setHeader("Vary", "Origin"); }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }
  if (req.method !== "POST") return send(res, 405, { ok: false, error: "Chỉ nhận POST." });

  let body;
  try { body = await readBody(req); } catch { return send(res, 400, { ok: false, error: "Dữ liệu gửi lên không hợp lệ." }); }
  if (body._honey) return send(res, 200, { ok: true });  // bot điền ô ẩn: giả vờ thành công, không lưu
  const v = validate(body);
  if (v.error) return send(res, 400, { ok: false, field: v.field, error: v.error });
  const { name, email, message } = v.data;
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();

  let id;
  try {
    const sql = getDb();
    await ensureSchema(sql);
    const [{ n }] = await sql`SELECT COUNT(*)::int AS n FROM messages WHERE ip = ${ip} AND created_at > NOW() - INTERVAL '10 minutes'`;
    if (n >= 5) return send(res, 429, { ok: false, error: "Bạn gửi hơi nhiều rồi, thử lại sau ít phút nhé." });
    [{ id }] = await sql`INSERT INTO messages (name, email, message, ip, user_agent)
      VALUES (${name}, ${email}, ${message}, ${ip}, ${String(req.headers["user-agent"] || "").slice(0, 300)}) RETURNING id`;
  } catch (e) {
    console.error("DB error:", e);
    return send(res, 500, { ok: false, error: "Máy chủ đang bận, bạn thử lại sau nhé." });
  }

  // Tin đã nằm trong CSDL, nên lỗi gửi mail không làm mất tin: vẫn báo thành công, cột emailed = false để biết mà xem lại
  try {
    await getMailer().sendMail({
      from: `"Portfolio Kiệt" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.GMAIL_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Portfolio: tin nhắn từ ${name}`,
      text: `Tên: ${name}\nEmail: ${email}\n\n${message}\n\n(Tin #${id} – bấm Trả lời để trả lời thẳng người gửi)`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px">
        <h2 style="color:#BC164D;margin:0 0 12px">Tin nhắn mới từ portfolio ♡</h2>
        <p><b>Tên:</b> ${esc(name)}<br><b>Email:</b> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        <div style="background:#FFD0DF;border-left:4px solid #BC164D;padding:12px 16px;border-radius:6px;white-space:pre-wrap">${esc(message)}</div>
        <p style="color:#7d3a54;font-size:12px">Tin #${id} · Bấm Trả lời để trả lời thẳng người gửi.</p></div>`
    });
    await getDb()`UPDATE messages SET emailed = TRUE WHERE id = ${id}`;
  } catch (e) {
    console.error("Mail error:", e);
  }
  return send(res, 200, { ok: true, id });
}

module.exports = handler;
module.exports.validate = validate;
module.exports.esc = esc;
