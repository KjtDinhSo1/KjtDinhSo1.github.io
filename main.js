const S = window.SITE, $ = s => document.querySelector(s), pad = n => String(n + 1).padStart(2, "0");
const media = w => w.img ? `<img src="${w.img}" alt="${w.title}" loading="lazy">`
  : `<span class="ph" style="--c:${w.color}"><b>${w.title}</b></span>`;

document.title = `${S.name} – ${S.role}`;
document.querySelector('meta[name=description]').content = S.intro;
$("#logo").textContent = S.logo || S.name;
$("#nav").innerHTML = S.nav.map(n => `<a href="${n.href}">${n.t}</a>`).join("");
/* Menu dropdown trên điện thoại: nút ☰ mở/đóng; bấm mục, bấm ra ngoài hoặc Esc thì đóng */
{
  const nav = $("#nav");
  $(".top").insertAdjacentHTML("beforeend",
    `<button class="menu-btn" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>`);
  const btn = $(".menu-btn");
  const setMenu = open => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  };
  btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("click", e => { if (!e.target.closest(".top")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); } });
}

$("#hero").innerHTML = `
  <div class="word" aria-hidden="true">${S.heroWord}</div>
  <div class="photo">${S.photo ? `<img src="${S.photo}" alt="${S.name}">` : S.initials}</div>
  <div class="hero-text"><p class="hi">Xin chào, mình là ${S.name}</p><h1>${S.role}</h1>
    <p>${S.intro}</p><a class="btn" href="#work">${S.cta}</a></div>
  <ul class="stats">${S.stats.map(s => `<li><b>${s.n}</b><span>${s.l}</span></li>`).join("")}</ul>`;

const cats = ["Tất cả", ...new Set(S.works.map(w => w.cat))];
$("#work").innerHTML = `
  <div class="head"><h2>${S.workTitle}</h2><div class="tabs" id="tabs">
    ${cats.map((c, i) => `<button aria-pressed="${i === 0}">${c}</button>`).join("")}</div></div>
  <div class="grid" id="grid"></div>`;
function drawGrid(cat) {
  const list = S.works.map((w, i) => ({ ...w, i })).filter(w => cat === "Tất cả" || w.cat === cat);
  $("#grid").innerHTML = list.map(w => `<button class="card" data-i="${w.i}">
    <div class="media">${media(w)}</div>
    <div class="meta"><span class="num">${pad(w.i)}</span><div><strong>${w.title}</strong><small>${w.cat} · ${w.year}</small></div></div></button>`).join("");
}
drawGrid("Tất cả");
$("#tabs").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-pressed", b === e.target));
  drawGrid(e.target.textContent);
  if (window.reveal) window.reveal();
  if (window.fan) window.fan();
});
const lb = $("#lb");
$("#grid").addEventListener("click", e => {
  const c = e.target.closest(".card"); if (!c) return;
  const w = S.works[c.dataset.i];
  lb.innerHTML = `<button class="x" aria-label="Đóng">×</button><div class="media">${media(w)}</div>
    <div class="lb-body"><small>${w.cat} · ${w.year}</small><h3>${w.title}</h3><p>${w.desc}</p>${w.link ? `<a class="btn" href="${w.link}" target="_blank" rel="noopener">Xem mã nguồn</a>` : ""}</div>`;
  lb.showModal();
});
lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".x")) lb.close(); });

$("#services").innerHTML = `<h2>${S.servicesTitle}</h2><ol class="rows">
  ${S.services.map((s, i) => `<li><span class="num">${pad(i)}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join("")}</ol>`;

const F = S.feature;
$("#feature").innerHTML = `<p class="hi">${F.label}: ${F.client}</p><h2>${F.title}<br>${F.sub}</h2>
  <div class="pair">${F.images.map((w, i) => `<figure class="pn" data-s="${i ? 1 : -1}"><div class="media">${media(w)}</div><figcaption>${w.title}</figcaption></figure>`).join("")}</div>
  <figure class="wide"><div class="media">${media(F.wide)}</div><figcaption>${F.wide.title}</figcaption></figure>`;

$("#about").innerHTML = `<div class="about"><div><h2>${S.aboutTitle}</h2><p>${S.aboutText}</p></div>
  <div><p class="sub" style="margin-top:0">Học vấn</p><ul class="edu">
    ${S.education.map(e => `<li><strong>${e.t}</strong><em>${e.y}</em><small>${e.s}</small></li>`).join("")}</ul></div></div>`;

const c = S.contact;
$("#contact").innerHTML = `<h2>${S.contactTitle}</h2><div class="cgrid">
  <ul class="clinks">
    <li><small>Email</small><a href="mailto:${c.email}">${c.email}</a></li>
    <li><small>Điện thoại</small><a href="tel:${c.phone.replace(/\s/g, "")}">${c.phone}</a></li>
    <li><small>Địa chỉ</small>${c.address}</li>
    ${c.social.map(s => `<li><a href="${s.href}" target="_blank" rel="noopener">${s.t}</a></li>`).join("")}</ul>
  <form id="form" novalidate>
    <label>Tên của bạn<span class="fi"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg><input name="name" autocomplete="name" maxlength="100"></span><span class="ferr"></span></label>
    <label>Mail của bạn để Kiệt trả lời<span class="fi"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><input name="email" type="email" autocomplete="email" maxlength="200"></span><span class="ferr"></span></label>
    <label>Bạn cần gì?<span class="fi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z"/></svg><textarea name="message" rows="4" maxlength="5000"></textarea></span><span class="ferr"></span></label>
    <input name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button class="btn">Gửi tin nhắn</button><p class="fmsg" id="fmsg" role="status" aria-live="polite"></p>
    <div class="fdone" role="status" aria-live="polite">
      <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z"/><path class="tick" d="M8 12.2l2.6 2.6L16 9.6"/></svg>
      <b>Đã gửi tới Kiệt rồi nè ♡</b><p>Mình nhận được tin của bạn rồi và sẽ trả lời qua email sớm nhất.</p>
      <button type="button" class="btn" id="again">Gửi tin khác</button>
    </div></form></div>`;
/* Gửi tin nhắn tới API của mình (api/contact.js): lưu vào SQLite rồi gửi mail về Gmail.
   Trên Vercel hoặc `npm start` API nằm cùng trang (/api/contact); trên GitHub Pages thì dùng contact.api,
   chưa điền thì mở ứng dụng email của người xem như cũ. */
{
  const API = c.api || (location.hostname.endsWith("github.io") ? "" : "/api/contact");
  const form = $("#form"), btn = form.querySelector(".btn"), fmsg = $("#fmsg");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;  // cùng luật với server
  const fieldErr = (name, text) => {
    const el = form.elements[name], lab = el.closest("label");
    lab.classList.add("bad"); lab.querySelector(".ferr").textContent = text;
    lab.animate([{ transform: "none" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], { duration: 280 });
    el.focus();
  };
  form.addEventListener("input", e => {
    const lab = e.target.closest("label.bad");
    if (lab) { lab.classList.remove("bad"); lab.querySelector(".ferr").textContent = ""; }
  });
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (form.classList.contains("busy")) return;
    form.querySelectorAll("label.bad").forEach(l => { l.classList.remove("bad"); l.querySelector(".ferr").textContent = ""; });
    const f = new FormData(form), data = Object.fromEntries([...f].map(([k, v]) => [k, String(v).trim()]));
    if (!data.name) return fieldErr("name", "Bạn nhập tên nhé.");
    if (!EMAIL_RE.test(data.email)) return fieldErr("email", "Email chưa đúng định dạng.");
    if (!data.message) return fieldErr("message", "Bạn nhập lời nhắn nhé.");
    if (!API) {
      location.href = `mailto:${c.email}?subject=${encodeURIComponent("Liên hệ từ " + data.name)}&body=${encodeURIComponent(data.message + "\n\n" + data.name + " – " + data.email)}`;
      return;
    }
    form.classList.add("busy"); btn.textContent = "Đang gửi…"; fmsg.className = "fmsg"; fmsg.textContent = "";
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), signal: AbortSignal.timeout(15000) });
      const d = await r.json().catch(() => ({}));
      if (d.field) return fieldErr(d.field, d.error);
      if (!r.ok || !d.ok) throw new Error(d.error || `Lỗi ${r.status}`);
      form.reset(); form.classList.add("sent");
      $("#again").focus({ preventScroll: true });
    } catch (err) {
      fmsg.className = "fmsg err";
      fmsg.textContent = (err.name === "TimeoutError" ? "Mạng hơi chậm nên chưa gửi được." : err.name === "TypeError" ? "Không kết nối được máy chủ." : err.message) + " Bạn thử lại, hoặc gửi thẳng tới ";
      fmsg.insertAdjacentHTML("beforeend", `<a href="mailto:${c.email}">${c.email}</a> nhé.`);
    } finally { form.classList.remove("busy"); btn.textContent = "Gửi tin nhắn"; }
  });
  $("#again").addEventListener("click", () => { form.classList.remove("sent"); form.elements.name.focus(); });
}
$("#foot").textContent = S.footer;

/* ===== MÀN MỞ ĐẦU: { ♥ } + gõ chữ + thanh tải, rồi màn hồng kéo lên. Bấm chuột hoặc phím để bỏ qua ===== */
const introDone = new Promise(done => {
  const loader = $("#loader"), root = document.documentElement;
  const finish = () => { root.classList.remove("intro"); done(); };
  let seen = false; try { seen = sessionStorage.getItem("intro") === "1"; sessionStorage.setItem("intro", "1"); } catch {}
  // chỉ chạy lần đầu vào trang trong mỗi phiên
  if (!loader || seen || matchMedia("(prefers-reduced-motion: reduce)").matches) { if (loader) loader.remove(); return finish(); }
  const msg = `Xin chào, mình là ${S.name.split(" ").pop()} ♡`, txt = $("#ld-text"), fill = $("#ld-fill"), pct = $("#ld-pct");
  const D = 1200, t0 = performance.now(); let out = false;
  const exit = () => {
    if (out) return; out = true;
    loader.classList.add("out"); setTimeout(finish, 250); setTimeout(() => loader.remove(), 1200);
  };
  (function tick(now) {
    if (out) return;
    const p = Math.min((now - t0) / D, 1), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    txt.textContent = msg.slice(0, Math.round(msg.length * Math.min(p * 1.5, 1)));
    fill.style.transform = `scaleX(${e})`; pct.textContent = Math.round(e * 100) + "%";
    if (p < 1) requestAnimationFrame(tick); else setTimeout(exit, 350);
  })(t0);
  loader.addEventListener("click", exit); addEventListener("keydown", exit, { once: true });
});

/* ===== HIỆU ỨNG (bật/tắt trong data.js → effects) ===== */
(() => {
  const fx = Object.assign({ reveal: true, spread: true, parallax: true, progress: true, cursor: true, marquee: true, counters: true,
    agents: [] }, S.effects);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement, $$ = s => [...document.querySelectorAll(s)];
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  let marq;
  if (fx.marquee) {
    const t = cats.slice(1).join(" • ") + " • ";
    $("#hero").insertAdjacentHTML("afterend", `<div class="marquee" aria-hidden="true"><div>${t.repeat(6)}</div></div>`);
    marq = $(".marquee div");
  }
  if (fx.reveal) {
    root.classList.add("fx");
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .12 });
    window.reveal = () => $$("h2,.rows li,.edu li,.about p,.sub,.chips,.clinks li,form").forEach(el => {
      if (el.dataset.r !== undefined) return;
      el.dataset.r = "";
      el.style.setProperty("--d", Math.min([...el.parentNode.children].indexOf(el), 5) * .08 + "s");
      io.observe(el);
    });
    window.reveal();
  }
  if (fx.counters) $$(".stats b").forEach((b, i) => {
    if (!/^\d+$/.test(b.textContent)) return;  // số có dấu chấm như "61.525" giữ nguyên
    const n = +b.textContent; b.textContent = 0;
    introDone.then(() => {
      const t0 = performance.now() + 500 + i * 150;
      const step = t => { const p = Math.min(Math.max((t - t0) / 1200, 0), 1);
        b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  });

  let bar; if (fx.progress) { bar = document.createElement("div"); bar.className = "bar"; document.body.append(bar); }
  const top = $(".top"), word = $(".word"), photo = $(".photo"); let last = 0, tick = false;
  const onScroll = () => {
    tick = false; const y = scrollY, max = root.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    top.classList.toggle("hide", y > last && y > 240 && !$("#nav").classList.contains("open")); last = y;  // menu điện thoại đang mở thì không ẩn thanh menu
    if (fx.parallax && y < innerHeight * 1.5) { word.style.setProperty("--py", y * .4 + "px"); photo.style.setProperty("--pp", y * .12 + "px"); }
    if (marq) marq.style.transform = `translateX(${-((y * .7) % (marq.scrollWidth / 2))}px)`;
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });

  if (fx.cursor && fine) {
    const r = document.createElement("div"); r.className = "cur"; r.innerHTML = "<span></span>"; document.body.append(r);
    addEventListener("pointermove", e => {
      r.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; r.classList.add("on");  // bám đúng tâm chuột, không trễ
      const card = e.target.closest(".card");
      r.classList.toggle("big", !!e.target.closest("a,button,input,textarea"));
      r.classList.toggle("view", !!card); r.firstChild.textContent = card ? "Xem" : "";
    });
    document.addEventListener("pointerleave", () => r.classList.remove("on"));
  }

  /* "Agent" quét trang như video: con trỏ bay tới từng phần tử, khoanh khung, nổ tia "+". */
  const names = fx.agents;
  if (names && names.length) {
    const colors = ["#BC164D", "#7a0e33", "#3d0a1d"];  // chỉ dùng màu của trang, đủ đậm để nhãn chữ trắng đọc rõ
    const layer = document.createElement("div"), hud = document.createElement("div");
    layer.className = "agents"; hud.className = "hud";
    layer.setAttribute("aria-hidden", "true"); hud.setAttribute("aria-hidden", "true");
    document.body.append(layer, hud);
    const sel = "h1,h2,h3,.card,.stats li,.chips span,.btn,.clinks li,.edu li,.hero-text p,.photo,figure,.tabs button";
    const seen = new Set();
    const spark = (x, y, c) => {
      const s = document.createElement("i"); s.className = "spark"; s.textContent = "+";
      s.style.cssText = `left:${x}px;top:${y}px;color:${c}`; layer.append(s); s.onanimationend = () => s.remove();
    };
    const ags = names.map((n, i) => {
      const el = document.createElement("div"), box = document.createElement("div"), c = colors[i % colors.length];
      el.className = "ag"; box.className = "abox"; el.style.setProperty("--c", c); box.style.setProperty("--c", c);
      el.innerHTML = `<svg width="16" height="18" viewBox="0 0 18 20"><path d="M1 1l6 17 2.5-7L17 8.5z" fill="currentColor"/></svg><span>${n}</span>`;
      layer.append(box, el);
      return { el, box, c, x: innerWidth / 2, y: innerHeight - 30, t: 0, k: .03 + Math.random() * .04 };
    });
    const pick = (a, now) => {
      const list = $$(sel).filter(e => { const r = e.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight; });
      a.tg = list[Math.random() * list.length | 0]; a.ox = .1 + Math.random() * .8; a.oy = .2 + Math.random() * .6;
      a.t = now + 6000; a.hit = false; a.box.classList.remove("on");  // 6s dự phòng nếu không tới được
    };
    let txt = "";
    introDone.then(() => { for (let i = 0; i < 8; i++) spark(Math.random() * innerWidth, Math.random() * innerHeight, colors[i % colors.length]); });
    let prev = 0;
    (function loop(now) {
      const dt = Math.min(now - prev, 1000) / 16.7; prev = now;  // chuẩn hoá theo 60fps để máy chậm vẫn bay đúng tốc độ
      if (!document.hidden) {
        ags.forEach(a => {
          const out = a.tg && (r => r.bottom < 0 || r.top > innerHeight)(a.tg.getBoundingClientRect());
          if (!a.tg || out || now > a.t) pick(a, now);
          let tx = a.x, ty = a.y;
          if (a.tg) {
            const r = a.tg.getBoundingClientRect(); tx = r.left + r.width * a.ox; ty = r.top + r.height * a.oy;
            if (!a.hit && Math.hypot(tx - a.x, ty - a.y) < 6) { a.hit = true; a.t = now + 1200 + Math.random() * 1600; seen.add(a.tg); spark(a.x, a.y, a.c); a.box.classList.add("on"); }
            if (a.hit) Object.assign(a.box.style, { left: r.left - 5 + "px", top: r.top - 5 + "px", width: r.width + 10 + "px", height: r.height + 10 + "px" });
          }
          const f = 1 - Math.pow(1 - a.k, dt); a.x += (tx - a.x) * f; a.y += (ty - a.y) * f; a.el.style.transform = `translate(${a.x}px,${a.y}px)`;
        });
        const t = seen.size ? `<b></b>${ags.length} con trỏ · đã ghé ${seen.size} / ${Math.max(seen.size, $$(sel).length)} chỗ` : "<b></b>Đang dạo quanh trang…";
        if (t !== txt) hud.innerHTML = txt = t;
      }
      requestAnimationFrame(loop);
    })(0);
  }
  if (fx.spread) {
    const cl = v => Math.min(1, Math.max(0, v)), ease = p => 1 - Math.pow(1 - p, 3);
    const prog = (el, span) => ease(cl((innerHeight - el.getBoundingClientRect().top) / (innerHeight * span)));
    const pair = $(".pair"), pns = $$(".pn"), wide = $(".wide .media");
    /* Thẻ tác phẩm: mỗi hàng bắt đầu chồng lên thẻ đầu hàng rồi xòe ra khi cuộn */
    window.fan = () => {
      const g = $("#grid"), gt = g.getBoundingClientRect().top, rows = {};
      [...g.children].forEach(c => (rows[c.offsetTop] = rows[c.offsetTop] || []).push(c));
      Object.values(rows).forEach(row => {
        const p = ease(cl((innerHeight - (gt + row[0].offsetTop - g.offsetTop)) / (innerHeight * .5))), q = 1 - p, fl = row[0].offsetLeft;
        row.forEach((c, i) => {
          c.style.transform = `translate(${(fl - c.offsetLeft) * q}px,${q * 28}px) rotate(${i * q * 3}deg) scale(${.9 + .1 * p})`;
          c.style.opacity = .15 + .85 * p; c.style.zIndex = i;
        });
      });
    };
    /* Dự án tiêu biểu: 2 ảnh tách ra hai bên, ảnh rộng mở dần hết chiều ngang.
       Điện thoại (1 cột): không đẩy ngang kẻo ảnh tràn ra ngoài màn hình, chỉ trượt lên và hiện dần từng ảnh */
    const narrow = matchMedia("(max-width: 700px)");
    const feat = () => {
      if (narrow.matches) pns.forEach(el => { const p = prog(el, .6);
        el.style.transform = `translateY(${(1 - p) * 40}px) scale(${.94 + .06 * p})`; el.style.opacity = .3 + .7 * p; });
      else { const p = prog(pair, .7), q = 1 - p;
        pns.forEach(el => { const s = +el.dataset.s; el.style.opacity = "";
          el.style.transform = `perspective(1200px) translateX(${-s * q * 55}%) rotateY(${s * q * 18}deg) rotate(${s * q * 4}deg)`; }); }
      const e = prog(wide.parentNode, .8);
      wide.style.clipPath = `inset(0 ${(1 - e) * 16}% round 6px)`; wide.style.transform = `scale(${.92 + .08 * e})`;
    };
    let t2 = false; const upd = () => { t2 = false; window.fan(); feat(); };
    addEventListener("scroll", () => { if (!t2) { t2 = true; requestAnimationFrame(upd); } }, { passive: true });
    addEventListener("resize", upd); upd();
  }
})();
