// Kiểm tra API /api/contact với SQLite thật (trong bộ nhớ) và Gmail giả lập (không gửi thư thật). Chạy: npm test
const test = require("node:test");
const assert = require("node:assert");
const Module = require("node:module");

const mails = [];
let mailFails = false;
const realLoad = Module._load;
Module._load = function (req, ...rest) {
  if (req === "nodemailer") return { createTransport: () => ({ sendMail: async m => { if (mailFails) throw new Error("smtp down"); mails.push(m); } }) };
  return realLoad.call(this, req, ...rest);
};
process.env.GMAIL_USER = "owner@gmail.com";
process.env.DB_PATH = ":memory:";
const handler = require("../api/contact.js");
const { DatabaseSync } = require("node:sqlite");

function call(method, body, headers = {}) {
  return new Promise(resolve => {
    const res = { headers: {}, statusCode: 200, setHeader(k, v) { this.headers[k] = v; },
      end(data) { resolve({ status: this.statusCode, headers: this.headers, json: data ? JSON.parse(data) : null }); } };
    handler({ method, body, headers: { origin: "https://kjtdinhso1.github.io", ...headers }, socket: {} }, res);
  });
}
const good = { name: "Lan", email: "lan@example.com", message: "Xin chào <b>Kiệt</b>" };
let ipN = 0;
const freshIp = () => ({ "x-forwarded-for": `10.0.0.${++ipN}, 172.16.0.1` });

test("lưu tin vào SQLite và gửi mail về chủ trang", async () => {
  mails.length = 0; mailFails = false;
  const headers = freshIp();
  const r = await call("POST", good, headers);
  assert.equal(r.status, 200); assert.equal(r.json.ok, true); assert.ok(r.json.id > 0);
  assert.equal(r.headers["Access-Control-Allow-Origin"], "https://kjtdinhso1.github.io");
  assert.equal(mails.length, 1);
  assert.equal(mails[0].to, "owner@gmail.com");
  assert.match(mails[0].replyTo, /lan@example.com/);
  assert.match(mails[0].html, /Xin chào &lt;b&gt;Kiệt&lt;\/b&gt;/, "HTML trong lời nhắn phải được escape");
  assert.match(mails[0].subject, /Lan/);
});

test("báo lỗi đúng ô khi dữ liệu sai", async () => {
  assert.equal((await call("POST", { ...good, name: " " })).json.field, "name");
  assert.equal((await call("POST", { ...good, email: "abc" })).json.field, "email");
  const r = await call("POST", { ...good, message: "" });
  assert.equal(r.status, 400); assert.equal(r.json.field, "message");
});

test("chặn gửi dồn dập: tin thứ 6 trong 10 phút từ cùng IP bị từ chối", async () => {
  const headers = freshIp();
  for (let i = 0; i < 5; i++) assert.equal((await call("POST", good, headers)).status, 200);
  assert.equal((await call("POST", good, headers)).status, 429);
  assert.equal((await call("POST", good, freshIp())).status, 200, "IP khác vẫn gửi được");
});

test("bot điền ô ẩn: báo thành công nhưng không gửi mail", async () => {
  mails.length = 0;
  const r = await call("POST", { ...good, _honey: "spam" }, freshIp());
  assert.equal(r.status, 200); assert.equal(mails.length, 0); assert.equal(r.json.id, undefined);
});

test("Gmail lỗi vẫn giữ tin trong CSDL và báo thành công", async () => {
  mailFails = true;
  const r = await call("POST", good, freshIp());
  assert.equal(r.status, 200); assert.ok(r.json.id > 0);
  mailFails = false;
});

test("trên Vercel, Gmail lỗi thì báo lỗi cho khách (vì SQLite chỉ là tạm)", async () => {
  mailFails = true; process.env.VERCEL = "1";
  const r = await call("POST", good, freshIp());
  delete process.env.VERCEL; mailFails = false;
  assert.equal(r.status, 502); assert.equal(r.json.ok, false);
});

test("preflight CORS và chặn trang lạ", async () => {
  assert.equal((await call("OPTIONS")).status, 204);
  const other = await call("POST", good, { origin: "https://evil.example", ...freshIp() });
  assert.equal(other.headers["Access-Control-Allow-Origin"], undefined);
  assert.equal((await call("GET")).status, 405);
});

test("lưu file SQLite thật trên đĩa và đánh dấu đã gửi mail", async () => {
  // mở một bản module mới trỏ tới file tạm, kiểm tra dữ liệu nằm trong bảng messages
  const fs = require("node:fs"), os = require("node:os"), path = require("node:path");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kiet-")), file = path.join(dir, "messages.db");
  delete require.cache[require.resolve("../api/contact.js")];
  process.env.DB_PATH = file;
  const h = require("../api/contact.js");
  await new Promise(resolve => h({ method: "POST", body: good, headers: freshIp(), socket: {} },
    { setHeader() {}, end: resolve }));
  const rows = new DatabaseSync(file).prepare("SELECT name, email, message, emailed FROM messages").all();
  assert.deepEqual(rows.map(r => ({ ...r })), [{ name: "Lan", email: "lan@example.com", message: "Xin chào <b>Kiệt</b>", emailed: 1 }]);
});
