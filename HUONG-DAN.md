# Hướng dẫn thay đổi thông tin Portfolio

Không cần biết code. Hầu hết mọi thứ bạn sửa trong **một file duy nhất: `data.js`**.

## 1. Xem website
- Cách nhanh: bấm đúp `index.html` để mở bằng trình duyệt.
- Cách chuẩn (có Live reload): mở thư mục bằng VS Code, cài tiện ích **Live Server**, chuột phải `index.html` → *Open with Live Server*. Hoặc chạy `npx serve` trong thư mục.

## 2. Cấu trúc thư mục
| File | Dùng để |
|---|---|
| `data.js` | **Toàn bộ nội dung** (tên, giới thiệu, tác phẩm, liên hệ…) |
| `style.css` | Màu sắc, font, giao diện |
| `main.js` | Code hiển thị (thường không cần sửa) |
| `index.html` | Khung trang |
| `assets/` | Bỏ ảnh của bạn vào đây |
| `api/contact.js` | Máy chủ nhận tin nhắn: lưu SQL + gửi mail (xem mục 12) |
| `test/` | Kiểm tra tự động cho API (`npm test`) |

## 3. Đổi thông tin cá nhân (`data.js`)
Sửa chữ nằm trong dấu `"..."`, giữ nguyên dấu phẩy và ngoặc.

- `name`: tên bạn. `initials`: chữ cái hiện khi chưa có ảnh.
- `role`: chức danh. `intro`: câu giới thiệu ngắn ở trang đầu.
- `heroWord`: chữ lớn phía sau ảnh (mặc định `PORTFOLIO`).
- `stats`: 3 con số nổi bật (`n` là số, `l` là nhãn).
- `education`, `tools`: học vấn và công cụ.
- `contact`: email, số điện thoại, địa chỉ, mạng xã hội. `contact.api` là địa chỉ máy chủ nhận tin nhắn của form Liên hệ (xem mục 12). Để trống thì form mở ứng dụng email của người xem.
- `footer`: dòng chữ cuối trang.

## 4. Thêm ảnh của bạn
1. Copy ảnh vào thư mục `assets/` (nên dùng `.jpg` hoặc `.webp`, dưới 500 KB).
2. Ảnh chân dung: `photo: "assets/avatar.webp"`. Nên dùng ảnh đã tách nền (PNG/WebP nền trong suốt), trang sẽ cho chủ thể nổi trên nền neon. Ảnh thường (JPG) sẽ hiện trong khung.
3. Ảnh tác phẩm: trong mục `works`, điền `img: "assets/ten-anh.jpg"` (tỉ lệ 4:3).
   Để `img: ""` thì trang tự hiện khối màu theo `color`.
> Tên file không dấu, không khoảng trắng: `solartrip-logo.jpg`.

## 5. Thêm, xoá, sắp xếp tác phẩm
Mỗi tác phẩm là một khối `{ ... },` trong `works`:
```js
{ title: "Tên dự án", cat: "Poster", year: 2026, img: "assets/poster1.jpg", color: "#ff6a13", desc: "Mô tả ngắn." },
```
- **Thêm**: copy một khối, dán ngay dưới, sửa nội dung.
- **Xoá**: xoá cả khối (nhớ xoá luôn dấu phẩy cuối khối).
- **Sắp xếp**: kéo khối lên/xuống. Số thứ tự `01, 02…` tự đánh lại.
- **Danh mục lọc** tự sinh từ `cat`. Muốn thêm danh mục mới, chỉ cần viết `cat` mới (vd `"Bao bì"`).

## 6. Đổi tiêu đề các phần
Trong `data.js`: `servicesTitle`, `aboutTitle`, `contactTitle`. Tiêu đề phần Dự án là `workTitle`. Danh sách dịch vụ sửa ở `services`, thêm bớt như `works`.

### Dự án tiêu biểu
Trong `data.js`, mục `feature`: sửa `client`, `title`, `sub`, 2 ảnh trong `images` (tỉ lệ 4:3 hoặc 16:10) và 1 ảnh `wide` (tỉ lệ 21:9, ảnh ngang càng rộng càng đẹp). Để `img: ""` thì hiện khối màu.

## 7. Đổi màu
Mở `style.css`, các dòng đầu tiên:
```css
--accent:#BC164D;   /* màu chủ đạo: nút, chữ nổi bật, viền */
--bg:#FFD0DF;       /* màu nền */
--hl:#FFE164;       /* màu nhấn: dải chữ chạy, bóng đổ nút, chữ <DEV/>, vùng bôi chọn */
```
- `--text`, `--mute`: màu chữ chính và chữ phụ (nên tối để đọc rõ trên nền sáng).
- `--panel`: nền phần Kỹ năng và ô nhập liệu. `--line`: màu đường kẻ.
- `--accent-ink`: màu chữ trên nút. Màu chủ đạo tối thì dùng `#fff`, sáng thì dùng chữ tối.
- Màu khối dự án sửa ở `color` trong `data.js`, màu các agent sửa ở `colors` trong `main.js`.

## 8. Đổi font
Font hiện tại: **Anton** (tiêu đề) và **Be Vietnam Pro** (nội dung), tải từ Google Fonts. Muốn đổi, vào [fonts.google.com](https://fonts.google.com), chọn font có hỗ trợ tiếng Việt, thay phần `family=...` trong thẻ `<link>` ở `index.html`, rồi đổi `--display` và `--body` trong `style.css`.

## 9. Hiệu ứng cuộn và chuyển động
Nằm trong `data.js`, mục `effects`. Đổi `true` thành `false` để tắt từng hiệu ứng:
| Tên | Hiệu ứng |
|---|---|
| `reveal` | Tiêu đề, thẻ tác phẩm, danh sách trượt lên lần lượt khi cuộn tới |
| `parallax` | Chữ PORTFOLIO và ảnh trôi chậm hơn nội dung khi cuộn |
| `progress` | Thanh cam trên cùng chạy theo tiến độ cuộn |
| `marquee` | Dải chữ cam chạy ngang theo con lăn chuột (lấy tên từ các danh mục tác phẩm) |
| `spread` | **Hiệu ứng "kéo ra"**: thẻ tác phẩm chồng lên nhau rồi xòe ra từng hàng; 2 ảnh dự án tiêu biểu tách ra hai bên; ảnh rộng mở dần hết chiều ngang (đều chạy theo con lăn chuột) |
| `counters` | Số liệu đếm từ 0 lên khi vào trang |
| *(màn mở đầu)* | Khi mở web: `{ ♥ }` bật lên, gõ "Xin chào, mình là Kiệt ♡", thanh tải chạy tới 100% rồi màn hồng kéo lên (lớp vàng lướt theo). Bấm chuột hoặc phím bất kỳ để bỏ qua. Câu chào sửa trong `main.js` (tìm `Xin chào, mình là`); bỏ hẳn thì xoá khối `<div class="loader">` trong `index.html` và chữ `class="intro"` ở thẻ `<html>` |
| `cursor` | Vòng tròn cam đi theo chuột, hiện chữ "Xem" khi rê vào tác phẩm (chỉ trên máy tính) |
| `agents` | **Agent quét trang** (như video): các con trỏ có tên bay khắp trang, khoanh khung từng phần tử, nổ tia "+", kèm thanh trạng thái phía dưới. Để `[]` để tắt |

Máy bật chế độ "giảm chuyển động" của hệ điều hành sẽ tự không chạy các hiệu ứng này.
Tiêu đề thanh menu tự ẩn khi cuộn xuống và hiện lại khi cuộn lên (sửa trong `main.js`, hàm `onScroll`).

## 10. Web đang chạy trên mạng
- Link: **https://kjtdinhso1.github.io**
- Mã nguồn: https://github.com/KjtDinhSo1/KjtDinhSo1.github.io (GitHub Pages, dựng từ nhánh `main`).

**Cập nhật web sau khi sửa file**: mở PowerShell trong thư mục `D:\PORTFOLIO` và chạy:
```
git add -A
git commit -m "Cập nhật nội dung"
git push
```
Khoảng 1 phút sau link sẽ hiện bản mới (nhấn Ctrl+F5 nếu vẫn thấy bản cũ).
File trong `.gitignore` (video, ảnh gốc) sẽ không bị đưa lên mạng.

## 11. Lỗi thường gặp
| Hiện tượng | Cách xử lý |
|---|---|
| Trang trắng, không có nội dung | Lỗi cú pháp trong `data.js` (thiếu dấu `,` `"` `}`). Mở F12 → Console xem dòng báo lỗi |
| Ảnh không hiện | Sai tên file hoặc đường dẫn (phân biệt hoa/thường) |
| Font không đổi | Chưa có mạng hoặc cần tải lại trang (Ctrl+F5) |

## 12. Form Liên hệ: lưu SQL + gửi mail (Nodemailer)
Khi khách bấm **Gửi tin nhắn**, trang gọi `api/contact.js` (chạy trên Vercel). API sẽ:
1. Kiểm tra dữ liệu, chặn bot (ô ẩn) và chặn gửi dồn dập (tối đa 5 tin / 10 phút / IP).
2. Lưu tin vào bảng `messages` trên **PostgreSQL (Neon)**. Bảng tự tạo ở lần gửi đầu tiên.
3. Gửi mail về Gmail của bạn bằng **Nodemailer**. Bấm *Trả lời* trong Gmail là trả lời thẳng người gửi.
   Nếu Gmail lỗi, tin vẫn nằm trong CSDL (cột `emailed = false`).

### Cài đặt lần đầu (bạn tự làm, khoảng 10 phút)
1. **Neon (CSDL)**: vào https://neon.tech → *Sign up with GitHub* → *Create project* (vùng gần nhất: Singapore).
   Bấm **Connect**, copy chuỗi `postgresql://...` (đây là `DATABASE_URL`).
2. **Mật khẩu ứng dụng Gmail**: vào https://myaccount.google.com/apppasswords (cần bật Xác minh 2 bước trước).
   Tạo một mật khẩu tên `Portfolio`, copy 16 ký tự (đây là `GMAIL_APP_PASSWORD`). Không dùng mật khẩu Gmail thật.
3. **Vercel (máy chủ)**: vào https://vercel.com → *Continue with GitHub* → *Add New → Project* →
   chọn kho `KjtDinhSo1.github.io` → mở *Environment Variables*, thêm 3 biến:
   `DATABASE_URL`, `GMAIL_USER` (= nguyenanhkiet173@gmail.com), `GMAIL_APP_PASSWORD` → bấm **Deploy**.
4. Copy địa chỉ Vercel cấp (vd `https://kjt-dinh-so1-github-io.vercel.app`), điền vào `data.js`:
   `api: "https://<địa-chỉ-vercel>/api/contact"` rồi push lên như mục 10.

Mẫu các biến nằm trong `.env.example`. **Không** ghi giá trị thật vào file nào trong kho (kho công khai).

### Xem tin nhắn đã lưu
Neon → dự án → **SQL Editor**, chạy:
```sql
SELECT id, created_at, name, email, message, emailed FROM messages ORDER BY id DESC;
```

### Kiểm tra code
`npm install` rồi `npm test` (giả lập CSDL và Gmail, không gửi thư thật).
