/* Chạy cả trang web + API trên máy của bạn: `npm start` rồi mở http://localhost:3000
   Tin nhắn lưu vĩnh viễn trong data/messages.db (SQLite) và gửi mail về Gmail (cần file .env, xem .env.example). */
const http = require("node:http"), fs = require("node:fs"), path = require("node:path");
const contact = require("./api/contact.js");

const PORT = Number(process.env.PORT) || 3000;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
const SITE_FILES = new Set(["index.html", "style.css", "main.js", "data.js"]);  // chỉ phát file của trang, không lộ .env hay data/

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/api/contact") return contact(req, res);
  const rel = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
  if (rel.includes("..") || !(SITE_FILES.has(rel) || rel.startsWith("assets/"))) { res.statusCode = 404; return res.end("Not found"); }
  fs.readFile(path.join(__dirname, rel), (err, buf) => {
    if (err) { res.statusCode = 404; return res.end("Not found"); }
    res.setHeader("Content-Type", TYPES[path.extname(rel)] || "application/octet-stream");
    res.end(buf);
  });
}).listen(PORT, () => console.log(`Portfolio + API đang chạy: http://localhost:${PORT}`));
