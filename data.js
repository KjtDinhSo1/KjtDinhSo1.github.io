/* ===== TẤT CẢ THÔNG TIN CỦA BẠN NẰM Ở ĐÂY =====
   Sửa chữ trong dấu "..." rồi lưu file. Xem HUONG-DAN.md để biết chi tiết. */
window.SITE = {
  name: "Nguyễn Anh Kiệt",
  initials: "AK",                       // hiện khi chưa có ảnh
  role: "Computer Science Student",
  heroWord: "&lt;DEV/&gt;",
  intro: "Sinh viên ngành Khoa học Máy tính. Mình thích biến bài toán khó thành code gọn, chạy nhanh và dễ bảo trì, từ web full-stack đến AI.",
  cta: "Xem dự án",
  photo: "assets/avatar.webp",          // ảnh đã tách nền (nền trong suốt)
  stats: [
    { n: 3,  l: "Dự án" },
    { n: 13, l: "Công nghệ" }
  ],
  nav: [
    { t: "Dự án",     href: "#work" },
    { t: "Kỹ năng",   href: "#services" },
    { t: "Giới thiệu", href: "#about" },
    { t: "Liên hệ",   href: "#contact" }
  ],

  /* DỰ ÁN: img để trống thì hiện khối màu; color là màu khối đó */
  workTitle: "Code nên sản phẩm",
  works: [
    { title: "Phân tích bài hát qua lời", cat: "AI / NLP", year: 2026, img: "", color: "#BC164D", desc: "Phân tích bài hát dựa trên lời bài hát bằng xử lý ngôn ngữ tự nhiên: làm sạch văn bản, trích xuất từ khoá, chủ đề và cảm xúc của từng bài." },
    { title: "Hệ thống tự động trả lời theo địa giới hành chính", cat: "Chatbot", year: 2026, img: "", color: "#e0457b", desc: "Hệ thống tự động trả lời câu hỏi về đơn vị hành chính: tra cứu tỉnh/thành, phường/xã và địa giới từ dữ liệu hành chính Việt Nam." },
    { title: "Monolingo – Web tự học tiếng Anh", cat: "Web", year: 2026, img: "", color: "#7a0e33", desc: "Website tự học tiếng Anh: học từ vựng, luyện tập theo bài và theo dõi tiến độ học mỗi ngày." }
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
    client: "Monolingo",
    title: "Monolingo.",
    sub: "Tự học tiếng Anh mỗi ngày.",
    images: [
      { title: "Học từ vựng theo chủ đề", img: "", color: "#e0457b" },
      { title: "Luyện tập và theo dõi tiến độ", img: "", color: "#BC164D" }
    ],
    wide: { title: "Monolingo – web tự học tiếng Anh", img: "", color: "#7a0e33" }
  },

  aboutTitle: "Hello, World! Tôi là Kiệt.",
  aboutText: "Mình là sinh viên ngành Khoa học Máy tính, đam mê phát triển phần mềm và trí tuệ nhân tạo. Mình thích hiểu tận gốc vì sao code chạy, viết code sạch, có test, và luôn học thêm công nghệ mới qua các dự án thực tế.",
  education: [
    { t: "Trường Đại học Tôn Đức Thắng (TDTU)", s: "Khoa Công nghệ Thông tin · Ngành Khoa học Máy tính", y: "2023 – 2027" }
  ],
  tools: ["C/C++", "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "Spring Boot", "PyTorch", "MySQL", "Git", "Docker", "Linux"],

  contactTitle: "Cùng nhau build...",
  contact: {
    email: "nguyenanhkiet173@gmail.com",
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
    counters: true,     // số liệu đếm từ 0
    cursor: true,       // vòng tròn đi theo chuột (chỉ trên máy tính)
    // "Agent" quét trang (như video): con trỏ màu bay khắp trang, khoanh khung, nổ tia "+".
    // Để [] để tắt.
    agents: ["Kiệt", "git", "debug", "test", "AI", "lint", "build", "deploy"]
  },

  footer: "© 2026 Nguyễn Anh Kiệt. Built with HTML, CSS & JavaScript."
};
