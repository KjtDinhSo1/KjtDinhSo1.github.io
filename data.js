/* ===== TẤT CẢ THÔNG TIN CỦA BẠN NẰM Ở ĐÂY =====
   Sửa chữ trong dấu "..." rồi lưu file. Xem HUONG-DAN.md để biết chi tiết. */
window.SITE = {
  name: "Nguyễn Anh Kiệt",
  logo: "Kinich",                       // tên hiện ở góc trái thanh menu
  initials: "AK",                       // hiện khi chưa có ảnh
  role: "Computer Science Student",
  heroWord: "KINICH",
  intro: "Mình học Khoa học Máy tính ở TDTU. Gần đây mình cho máy đọc lời 61.525 bài hát tiếng Việt để xem chúng nói về gì: 71% là chuyện tình yêu.",
  cta: "Xem dự án",
  photo: "assets/avatar.webp",          // ảnh đã tách nền (nền trong suốt)
  stats: [
    { n: 4,  l: "Dự án" },
    { n: 13, l: "Công nghệ" }
  ],
  nav: [
    { t: "Dự án",     href: "#work" },
    { t: "Kỹ năng",   href: "#services" },
    { t: "Giới thiệu", href: "#about" },
    { t: "Liên hệ",   href: "#contact" }
  ],

  /* DỰ ÁN: img là ảnh trong assets/du-an (ngang, tỉ lệ 4:3 đẹp nhất); để "" thì hiện khối màu theo color */
  workTitle: "Code nên sản phẩm",
  works: [
    { title: "Phân tích bài hát qua lời", cat: "AI / NLP", year: 2026, img: "assets/du-an/bai-hat.webp", color: "#BC164D", desc: "Phân tích bài hát dựa trên lời bài hát bằng xử lý ngôn ngữ tự nhiên: làm sạch văn bản, trích xuất từ khoá, chủ đề và cảm xúc của từng bài." },
    { title: "Hệ thống tự động trả lời theo địa giới hành chính", cat: "Chatbot", year: 2026, img: "assets/du-an/chatbot.webp", color: "#e0457b", desc: "Chatbot Tri Việt tự động trả lời câu hỏi về đơn vị hành chính: tra cứu tỉnh/thành, phường/xã, mã hành chính và địa giới từ dữ liệu hành chính Việt Nam, kèm nguồn minh chứng cho từng câu trả lời." },
    { title: "Monolingo – Web tự học tiếng Anh", cat: "Web", year: 2026, img: "assets/du-an/monolingo.webp", color: "#7a0e33", desc: "Website tự học tiếng Anh: học từ vựng, luyện tập theo bài và theo dõi tiến độ học mỗi ngày." },
    { title: "Web Portfolio cá nhân", cat: "Web", year: 2026, img: "assets/du-an/portfolio.webp", color: "#e0457b", desc: "Chính trang web này: HTML, CSS, JavaScript thuần với màn mở đầu, hiệu ứng cuộn và agent quét trang; form liên hệ gọi API Node trên Vercel, lưu SQLite và gửi mail bằng Nodemailer." }
  ],

  servicesTitle: "Từ thuật toán, đến sản phẩm.",
  services: [
    { t: "Lập trình Web", d: "HTML, CSS, JavaScript, React, Node.js, Express. Giao diện responsive, API REST." },
    { t: "Backend & CSDL", d: "Java Spring Boot, MySQL, PostgreSQL, MongoDB. Thiết kế schema và tối ưu truy vấn." },
    { t: "AI & Machine Learning", d: "Python, NumPy, Pandas, scikit-learn, PyTorch. Xử lý dữ liệu, huấn luyện và đánh giá mô hình." },
    { t: "Cấu trúc dữ liệu & giải thuật", d: "C/C++, luyện LeetCode và Codeforces, phân tích độ phức tạp." },
    { t: "Hệ thống & DevOps", d: "Linux, Git, Docker, CI/CD với GitHub Actions, triển khai lên cloud." },
    { t: "Làm việc nhóm", d: "Agile/Scrum, review code, viết tài liệu kỹ thuật rõ ràng." }
  ],

  /* DỰ ÁN TIÊU BIỂU: 2 ảnh lớn tách ra hai bên + 1 ảnh rộng mở ra khi cuộn */
  feature: {
    label: "Dự án tiêu biểu",
    client: "Phân tích lời bài hát",
    title: "Phân tích chủ đề bài hát.",
    sub: "Theo lời bài hát tiếng Việt.",
    images: [
      { title: "Xử lý lời bài hát tiếng Việt", img: "assets/du-an/bai-hat-xu-ly.svg", color: "#e0457b" },
      { title: "Xác định chủ đề của từng bài hát", img: "assets/du-an/bai-hat-chu-de.svg", color: "#BC164D" }
    ],
    wide: { title: "Phân tích chủ đề bài hát theo lời bài hát tiếng Việt", img: "assets/du-an/bai-hat-rong.webp", color: "#7a0e33" }
  },

  aboutTitle: "Chào bạn, mình là Kiệt.",
  aboutText: "Mình thích những bài toán dính tới tiếng Việt: phân loại chủ đề bài hát chỉ từ lời, hay chatbot Tri Việt tra cứu địa giới hành chính và trả lời kèm nguồn cho từng câu. Mình cũng làm web, như Monolingo để tự học tiếng Anh và chính trang này, từ giao diện tới form liên hệ gửi mail.",
  education: [
    { t: "Trường Đại học Tôn Đức Thắng (TDTU)", s: "Khoa Công nghệ Thông tin · Ngành Khoa học Máy tính", y: "2023 – 2027" }
  ],
  tools: ["C/C++", "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "Spring Boot", "PyTorch", "MySQL", "Git", "Docker", "Linux"],

  contactTitle: "Cùng nhau build...",
  contact: {
    email: "nguyenanhkiet173@gmail.com",
    // Địa chỉ API nhận tin nhắn (Vercel), vd "https://ten-du-an.vercel.app/api/contact". Để "" thì form mở ứng dụng email.
    api: "https://kjt-dinh-so1-github-io.vercel.app/api/contact",
    phone: "0364 206 153",
    social: [
      { t: "GitHub · KjtDinhSo1",      href: "https://github.com/KjtDinhSo1" },
      { t: "Facebook · Nguyễn Kiệt",   href: "https://www.facebook.com/nguyen.kiet.838695" }
    ],
    address: "TP. Hồ Chí Minh, Việt Nam"
  },
  /* HIỆU ỨNG: đổi true thành false để tắt từng cái */
  effects: {
    reveal: true,       // nội dung trượt lên khi cuộn tới
    parallax: true,     // chữ lớn và ảnh trôi chậm hơn khi cuộn
    progress: true,     // thanh màu chủ đạo chạy trên cùng theo tiến độ cuộn
    marquee: true,      // dải chữ vàng chạy ngang theo con lăn chuột
    spread: true,       // thẻ dự án xòe ra từng hàng, ảnh dự án tiêu biểu tách ra và mở rộng khi cuộn
    counters: false,    // số liệu đếm từ 0
    cursor: false,      // vòng tròn đi theo chuột (chỉ trên máy tính)
    // "Agent" quét trang (như video): con trỏ màu bay khắp trang, khoanh khung, nổ tia "+".
    // Để [] để tắt.
    agents: ["Kiệt", "AI", "debug"]
  },

  footer: "© 2026 Nguyễn Anh Kiệt · TP. Hồ Chí Minh"
};
