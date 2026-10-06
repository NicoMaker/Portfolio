const $ = (s, e = document) => e.querySelector(s),
  $$ = (s, e = document) => [...e.querySelectorAll(s)];
const load = (u) => fetch(u).then((r) => (r.ok ? r.json() : Promise.reject(u)));
const list = (v) =>
  Array.isArray(v)
    ? v
    : typeof v === "string"
      ? v.split(/\n|;/).filter(Boolean)
      : [];
const ext = (h, t) =>
  h
    ? `<a href="${h}" target="_blank" rel="noopener"><i class="bx bx-link-external"></i>${t}</a>`
    : "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---- terminal "typing" (loader + hero panel) ---- */
async function type(el, parts, speed = 18, loop = false) {
  do {
    el.textContent = "";
    for (const [c, t] of parts) {
      const s = document.createElement("span");
      if (c) s.className = c;
      el.append(s);
      for (const ch of t) {
        s.textContent += ch;
        await sleep(speed);
      }
    }
    if (loop) await sleep(4000);
  } while (loop && !matchMedia("(prefers-reduced-motion:reduce)").matches);
}
const boot = () =>
  type(
    $("#terminalBody"),
    [
      ["k", "$ "],
      ["f", "npm run"],
      [0, " portfolio\n"],
      ["c", "// avvio...\n"],
      ["s", "✔ pronto"],
    ],
    14,
  );

/* ---- hero: pannelli codice ciclici (JSON/HeroPanels.json) ---- */
async function heroPanels() {
  let files = [];
  try {
    files = await load("JSON/HeroPanels.json");
  } catch {
    return;
  }
  const body = $("#heroCodeBody"),
    name = $(".code .bar span"),
    panel = body.closest(".code"),
    small = matchMedia("(max-width:480px)").matches,
    d = small ? 6 : 10;
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    name.textContent = files[0].name;
    body.innerHTML = files[0].lines
      .map(
        (l) =>
          "<div>" +
          l
            .map(
              (t) => `<span class="${t.t}">${t.v.replace(/</g, "&lt;")}</span>`,
            )
            .join("") +
          "</div>",
      )
      .join("");
    return;
  }
  for (let i = 0; ; i = (i + 1) % files.length) {
    const f = files[i];
    body.innerHTML = "";
    name.textContent = f.name;
    panel.classList.toggle("compact", f.lines.length > 14);
    for (const line of f.lines) {
      const row = document.createElement("div");
      body.append(row);
      body.scrollTop = body.scrollHeight;
      for (const t of line) {
        if (!t.v) continue;
        const sp = document.createElement("span");
        if (t.t) sp.className = t.t;
        row.append(sp);
        for (let c = 1; c <= t.v.length; c++) {
          sp.textContent = t.v.slice(0, c);
          await sleep(d);
        }
      }
    }
    body.insertAdjacentHTML("beforeend", '<span class="caret"></span>');
    body.scrollTop = body.scrollHeight;
    await sleep(1400);
  }
}

/* ---- hero ---- */
async function hero() {
  heroPanels();
  let ph = ["Programmatore", "Problem Solver", "UI/UX Designer", "Clean code"];
  try {
    ph = (await load("JSON/phares.json")).typingPhrases;
  } catch {}
  const el = $("#typed");
  let i = 0,
    j = 0,
    del = false;
  (function tick() {
    const w = ph[i];
    el.textContent = w.slice(0, j);
    if (!del && j === w.length) {
      del = true;
      return setTimeout(tick, 1600);
    }
    if (del && j === 0) {
      del = false;
      i = (i + 1) % ph.length;
    }
    j += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 85);
  })();
}

/* ---- curriculum ---- */
const R = {
  attestati: (d) =>
    `<h3>${d.titolo}</h3>${d.ente ? `<span class="tag">${d.ente}</span>` : ""}<p>${d.descrizione || ""}</p><div class="links">${ext(d.link, "Visualizza")}</div>`,
  linguistiche: (d) =>
    `<img class="flag" loading="lazy" src="${d.immagine}" alt="${d.lingua}"><h3>${d.lingua}</h3><span class="tag">${d.livello}</span><div class="links">${ext(d.link, "Impara")}</div>`,
  esperienze: (d) =>
    `${d.logo ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.azienda}">` : ""}<h3>${d.ruolo}</h3><p><b>${d.azienda}</b> · ${d.luogo || ""}</p><div class="meta"><span class="tag">${d.periodo || ""}</span></div><ul>${list(
      d.attivita,
    )
      .map((a) => `<li>${a}</li>`)
      .join("")}</ul><div class="links">${ext(d.sito, "Sito")}</div>`,
  istruzione: (d) =>
    `${d.logo ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.istituto}">` : ""}<h3>${d.titolo}</h3><p><b>${d.istituto}</b> · ${d.luogo || ""}</p><div class="meta"><span class="tag">${d.periodo || ""}</span>${d.livello ? `<span class="tag">${d.livello}</span>` : ""}</div><ul>${list(
      d.competenze,
    )
      .map((a) => `<li>${a}</li>`)
      .join("")}</ul><div class="links">${ext(d.sito, "Sito")}</div>`,
  sites: (d) =>
    `<img class="cover" loading="lazy" src="${d.immagine}" alt="${d.nome}"><h3>${d.nome}</h3><div class="links">${ext(d.link, "Visita")}${ext(d.codice, "Codice")}</div>`,
};
const card = (h) => `<article class="card reveal">${h}</article>`;
async function curriculum() {
  let data,
    cats = {};
  try {
    data = await load("JSON/Curriculum.json");
  } catch (e) {
    $$("section .grid").forEach(
      (g) => (g.innerHTML = "<p>Impossibile caricare i contenuti.</p>"),
    );
    return;
  }
  try {
    cats = (await load("JSON/Categories.json")).skillCategories;
  } catch {}
  const key = (name) =>
    Object.keys(cats).find((c) =>
      cats[c].some((s) => s.toLowerCase() === name.toLowerCase()),
    ) || "Altro";
  const map = {
    attestati: "attestati",
    linguistiche: "linguistiche",
    esperienze: "esperienze",
    istruzione: "istruzione",
    sites: "sites",
  };
  for (const k in map)
    $(`#${k} .grid`).innerHTML = (data[k] || [])
      .map((d) => card(R[k](d)))
      .join("");
  const sk = data.competenze || [],
    names = ["Tutte", ...new Set(sk.map((s) => key(s.nome)))],
    box = $("#competenze .skills");
  const draw = (c) => {
    box.innerHTML = sk
      .filter((s) => c === "Tutte" || key(s.nome) === c)
      .map((s) =>
        card(
          `<img loading="lazy" src="${s.immagine}" alt="" onerror="this.remove()"><h3>${s.nome}</h3><span class="tag">${key(s.nome)}</span><p>${s.descrizione || ""}</p><div class="links">${ext(s.link, "Docs")}</div>`,
        ),
      )
      .join("");
    reveal(box);
  };
  $("#tabs").innerHTML = names
    .map((n, i) => `<button class="${i ? "" : "on"}">${n}</button>`)
    .join("");
  $("#tabs").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
    draw(b.textContent);
  };
  draw("Tutte");
  reveal(document);
}

/* ---- social ---- */
async function social() {
  try {
    $("#social").innerHTML = (await load("JSON/Social.json")).socialLinks
      .map(
        (s) =>
          `<a href="${s.url}" title="${s.title}" aria-label="${s.name}" ${s.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><img loading="lazy" src="${s.icon}" alt="${s.alt}"></a>`,
      )
      .join("");
  } catch {}
}

/* ---- captcha + form ---- */
let code = "";
function captcha() {
  const c = $("#captchaCanvas"),
    x = c.getContext("2d");
  code = Array.from(
    { length: 6 },
    () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[(Math.random() * 32) | 0],
  ).join("");
  x.fillStyle = "#10213f";
  x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 70; i++) {
    x.fillStyle = `hsla(${Math.random() * 360},70%,65%,.5)`;
    x.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  }
  for (let i = 0; i < 5; i++) {
    x.strokeStyle = `hsla(${Math.random() * 360},70%,65%,.6)`;
    x.beginPath();
    x.moveTo(0, Math.random() * 70);
    x.lineTo(400, Math.random() * 70);
    x.stroke();
  }
  x.font = "700 38px JetBrains Mono, monospace";
  x.textBaseline = "middle";
  [...code].forEach((ch, i) => {
    x.save();
    x.translate(30 + i * 58, 35);
    x.rotate((Math.random() - 0.5) * 0.5);
    x.fillStyle = "#64ffda";
    x.fillText(ch, 0, 0);
    x.restore();
  });
}
function form() {
  captcha();
  $("#refreshCaptcha").onclick = captcha;
  const f = $("#contactForm"),
    m = $("#formMsg"),
    say = (t, k) => {
      m.textContent = t;
      m.className = "full msg " + k;
    };
  f.telefono.addEventListener(
    "input",
    (e) => (e.target.value = e.target.value.replace(/[^\d+\s]/g, "")),
  );
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!f.checkValidity()) {
      f.reportValidity();
      return say("Compila correttamente tutti i campi.", "err");
    }
    if ($("#captchaInput").value.trim().toUpperCase() !== code) {
      captcha();
      $("#captchaInput").value = "";
      return say("Captcha errato, riprova.", "err");
    }
    const d = Object.fromEntries(new FormData(f)),
      body = `Nome: ${d.name} ${d.cognome}\nEmail: ${d.email}\nTelefono: ${d.telefono}\n\n${d.message}`;
    say("Apertura del client di posta…", "ok");
    location.href = `mailto:nicola.marano02@gmail.com?subject=${encodeURIComponent(d.oggetto)}&body=${encodeURIComponent(body)}`;
    f.reset();
    captcha();
  });
}

/* ---- UI: reveal, scrollspy, progress, menu ---- */
const io = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), io.unobserve(e.target)),
    ),
  { threshold: 0.12 },
);
function reveal(root) {
  $$(".reveal:not(.in)", root).forEach((el) => io.observe(el));
}
function ui() {
  const links = $$("nav a"),
    nav = $("#menu"),
    hb = $("#hamburger");
  const spy = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) =>
            a.classList.toggle("on", a.hash === "#" + e.target.id),
          );
          history.replaceState(null, "", "#" + e.target.id);
        }
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  $$("main section").forEach((s) => spy.observe(s));
  const toggle = (o) => {
    nav.classList.toggle("open", o);
    hb.setAttribute("aria-expanded", o);
    hb.firstElementChild.className = "bx " + (o ? "bx-x" : "bx-menu");
  };
  hb.onclick = () => toggle(!nav.classList.contains("open"));
  nav.onclick = (e) => e.target.closest("a") && toggle(false);
  addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
  const bar = $("#progress"),
    up = $("#toTop");
  addEventListener(
    "scroll",
    () => {
      const h = document.documentElement,
        p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = `scaleX(${p})`;
      up.classList.toggle("show", h.scrollTop > 600);
    },
    { passive: true },
  );
  up.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  $("#year").textContent = new Date().getFullYear();
}

/* ---- init ---- */
const t0 = boot();
ui();
reveal(document);
await Promise.allSettled([hero(), curriculum(), social()]);
form();
await Promise.race([t0, sleep(1800)]);
$("#loader").classList.add("done");
