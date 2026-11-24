// Kiểm tra API /api/contact với CSDL và Gmail giả lập (không gửi thư thật). Chạy: npm test
const test = require("node:test");
const assert = require("node:assert");
const Module = require("node:module");

const queries = [], mails = [];
let recentCount = 0, mailFails = false;
const fakeSql = (strings, ...values) => {
  const text = strings.join("?").replace(/\s+/g, " ").trim();
  queries.push({ text, values });
  if (text.startsWith("SELECT COUNT")) return Promise.resolve([{ n: recentCount }]);
  if (text.startsWith("INSERT")) return Promise.resolve([{ id: 42 }]);
  return Promise.resolve([]);
};
const realLoad = Module._load;
Module._load = function (req, ...rest) {
  if (req === "@neondatabase/serverless") return { neon: () => fakeSql };
  if (req === "nodemailer") return { createTransport: () => ({ sendMail: async m => { if (mailFails) throw new Error("smtp down"); mails.push(m); } }) };
  return realLoad.call(this, req, ...rest);
};
process.env.GMAIL_USER = "owner@gmail.com";
const handler = require("../api/contact.js");

function call(method, body, headers = {}) {
  return new Promise(resolve => {
    const res = { headers: {}, statusCode: 200, setHeader(k, v) { this.headers[k] = v; },
      end(data) { resolve({ status: this.statusCode, headers: this.headers, json: data ? JSON.parse(data) : null }); } };
    handler({ method, body, headers: { origin: "https://kjtdinhso1.github.io", ...headers }, socket: {} }, res);
  });
}
const good = { name: "Lan", email: "lan@example.com", message: "Xin chào <b>Kiệt</b>" };

test("lưu tin vào CSDL và gửi mail về chủ trang", async () => {
  queries.length = mails.length = 0; recentCount = 0; mailFails = false;
  const r = await call("POST", good, { "x-forwarded-for": "1.2.3.4, 10.0.0.1" });
  assert.equal(r.status, 200); assert.deepEqual(r.json, { ok: true, id: 42 });
  assert.equal(r.headers["Access-Control-Allow-Origin"], "https://kjtdinhso1.github.io");
  const ins = queries.find(q => q.text.startsWith("INSERT"));
  assert.deepEqual(ins.values.slice(0, 4), ["Lan", "lan@example.com", "Xin chào <b>Kiệt</b>", "1.2.3.4"]);
  assert.ok(queries.some(q => q.text.startsWith("UPDATE messages SET emailed = TRUE")));
  assert.equal(mails.length, 1);
  assert.equal(mails[0].to, "owner@gmail.com");
  assert.match(mails[0].replyTo, /lan@example.com/);
  assert.match(mails[0].html, /Xin chào &lt;b&gt;Kiệt&lt;\/b&gt;/, "HTML trong lời nhắn phải được escape");
});

test("báo lỗi đúng ô khi dữ liệu sai", async () => {
  assert.equal((await call("POST", { ...good, name: " " })).json.field, "name");
  assert.equal((await call("POST", { ...good, email: "abc" })).json.field, "email");
  const r = await call("POST", { ...good, message: "" });
  assert.equal(r.status, 400); assert.equal(r.json.field, "message");
});

test("chặn gửi dồn dập: tin thứ 6 trong 10 phút bị từ chối", async () => {
  queries.length = 0; recentCount = 5;
  const r = await call("POST", good);
  assert.equal(r.status, 429);
  assert.ok(!queries.some(q => q.text.startsWith("INSERT")));
  recentCount = 0;
});

test("bot điền ô ẩn: báo thành công nhưng không lưu", async () => {
  queries.length = 0;
  const r = await call("POST", { ...good, _honey: "spam" });
  assert.equal(r.status, 200); assert.equal(queries.length, 0);
});

test("Gmail lỗi vẫn giữ tin trong CSDL và báo thành công", async () => {
  queries.length = 0; mailFails = true;
  const r = await call("POST", good);
  assert.equal(r.status, 200);
  assert.ok(queries.some(q => q.text.startsWith("INSERT")));
  assert.ok(!queries.some(q => q.text.startsWith("UPDATE")));
  mailFails = false;
});

test("preflight CORS và chặn trang lạ", async () => {
  const pre = await call("OPTIONS");
  assert.equal(pre.status, 204);
  const other = await call("POST", good, { origin: "https://evil.example" });
  assert.equal(other.headers["Access-Control-Allow-Origin"], undefined);
  assert.equal((await call("GET")).status, 405);
});
