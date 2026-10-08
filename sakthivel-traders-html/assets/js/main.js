/* =============================================================
   SAKTHIVEL TRADERS — site behaviour (no build step, no libraries)
   You normally only need to edit config.js.
   ============================================================= */
(function () {
  "use strict";

  const S = window.SITE;
  const PRODUCTS = window.PRODUCTS;
  const CATEGORIES = window.CATEGORIES;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const wa = (msg) => `https://wa.me/${S.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
  const isShop = document.body.dataset.page === "shop";

  /* ---------------------------------------------------------
     ICONS (Lucide, MIT) — <i data-icon="name"></i> in HTML
     --------------------------------------------------------- */
  const P = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    searchX: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m13.5 8.5-5 5M8.5 8.5l5 5"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2.7 2.7 0 0 1-2-1 2.7 2.7 0 0 1-2 1 2 2 0 0 1-2-2V7"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
    cloudRain: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 14v6M8 14v6M12 16v6"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    tag: '<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  };
  const WA_PATH =
    '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.27 11.27 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.65l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z"/>';

  const icon = (name, extra = "") =>
    name === "whatsapp"
      ? `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${WA_PATH}</svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[name] || ""}</svg>`;

  const hydrateIcons = (root = document) =>
    $$("i[data-icon]", root).forEach((el) => (el.outerHTML = icon(el.dataset.icon, el.className ? `class="${el.className}"` : "")));

  /* ---------------------------------------------------------
     PRODUCT ILLUSTRATION (used until real photos are added)
     --------------------------------------------------------- */
  const SEAT = "M48 182 C44 160 70 146 110 146 L190 150 C215 151 232 140 250 126 C270 110 300 104 330 108 C352 111 362 124 356 142 C350 162 330 176 300 184 L240 200 C220 205 200 206 180 206 L80 206 C60 206 50 198 48 182 Z";
  const TANK = "M70 196 C58 150 96 104 170 94 C250 84 320 104 338 150 C348 178 330 200 296 206 L120 210 C92 211 76 208 70 196 Z";
  let artId = 0;

  function art(kind, color, label, alt, image) {
    if (image) return `<img class="art art--photo" src="${esc(image)}" alt="${esc(alt)}" loading="lazy">`;
    const u = "a" + ++artId;
    const shape = kind === "tank" ? TANK : SEAT;
    const body = (d, dy = 0, op = 1) => `
      <g transform="translate(0 ${dy})" opacity="${op}">
        <path d="${d}" fill="${color}"/>
        <path d="${d}" fill="url(#sh${u})"/>
        ${d === SEAT ? `<path d="${d}" fill="url(#q${u})" clip-path="url(#c${u})" opacity=".5"/>` : ""}
        <path d="${d}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-dasharray="7 6" transform="translate(20 16) scale(.9)" vector-effect="non-scaling-stroke"/>
        ${d === SEAT
          ? '<path d="M246 128 C238 158 236 184 240 200" stroke="rgba(0,0,0,.45)" stroke-width="3" fill="none"/>'
          : '<path d="M262 204 C246 176 254 150 292 134" stroke="rgba(0,0,0,.4)" stroke-width="3" fill="none"/><ellipse cx="178" cy="98" rx="20" ry="6" fill="rgba(0,0,0,.5)"/><ellipse cx="178" cy="96" rx="14" ry="3.5" fill="rgba(255,255,255,.3)"/>'}
      </g>`;
    return `<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(alt)}">
      <defs>
        <radialGradient id="g${u}" cx="50%" cy="58%" r="60%"><stop offset="0" stop-color="${color}" stop-opacity=".55"/><stop offset="1" stop-color="#141416" stop-opacity="0"/></radialGradient>
        <linearGradient id="sh${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
        <pattern id="q${u}" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 L0 22 M0 0 L22 0" stroke="rgba(0,0,0,.55)" stroke-width="1.4"/></pattern>
        <clipPath id="c${u}"><path d="${SEAT}"/></clipPath>
      </defs>
      <rect width="400" height="300" fill="#141416"/><rect width="400" height="300" fill="url(#g${u})"/>
      <g stroke="rgba(255,255,255,.05)"><path d="M0 60H400M0 120H400M0 180H400M0 240H400"/></g>
      <ellipse cx="200" cy="236" rx="150" ry="12" fill="#000" opacity=".55"/>
      ${kind === "wholesale" ? `<g transform="translate(0 6)">${body(SEAT, -36, 0.35)}${body(SEAT, -18, 0.6)}${body(SEAT)}</g>` : body(shape)}
      ${kind === "custom" ? '<text x="290" y="160" text-anchor="middle" fill="rgba(255,255,255,.85)" font-family="Big Shoulders Display, Impact, sans-serif" font-style="italic" font-weight="800" font-size="26">YOU</text>' : ""}
      ${label ? `<text x="20" y="282" fill="rgba(255,255,255,.45)" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="2.5">${esc(label)}</text>` : ""}
    </svg>`;
  }

  /* ---------------------------------------------------------
     PRODUCT CARD
     --------------------------------------------------------- */
  function cardHTML(p) {
    const [cName, cHex] = p.colors[0];
    const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    return `
    <article class="card stitch group" data-id="${p.id}" data-color="${esc(cName)}">
      <button type="button" class="card__art" data-quick="${p.id}" aria-label="Quick view: ${esc(p.name)}">
        <span class="art-slot">${art(p.category, cHex, catName(p.category).toUpperCase(), `${p.name} in ${cName}`, p.image)}</span>
        ${p.badge ? `<span class="card__badge">${esc(p.badge)}</span>` : ""}
        ${off > 0 ? `<span class="card__off">−${off}%</span>` : ""}
        <span class="card__quick">Quick view</span>
      </button>
      <div class="card__body">
        <div class="rating">${icon("star")}<b>${p.rating.toFixed(1)}</b><span>(${p.reviews} reviews)</span></div>
        <h3 class="h3">${esc(p.name)}</h3>
        <p class="card__meta">${esc(p.material)}</p>
        <p class="card__meta"><b>Fits:</b> ${esc(p.fits)}</p>
        <fieldset class="swatches">
          <legend class="sr-only">Colour for ${esc(p.name)}</legend>
          ${p.colors.map(([n, h], i) => `<button type="button" class="swatch" data-swatch="${esc(n)}" data-hex="${h}" aria-pressed="${i === 0}" aria-label="${esc(n)}" title="${esc(n)}"><span style="background:${h}"></span></button>`).join("")}
          <span class="swatch-name">${esc(cName)}</span>
        </fieldset>
        <div class="card__foot">
          <div>
            <p class="price">${inr(p.price)}</p>
            <p class="price-sub">${p.mrp ? `<s>${inr(p.mrp)}</s>` : ""}${esc(p.unit || "per piece")}</p>
          </div>
          <button type="button" class="btn btn--primary btn--add" data-add="${p.id}">${icon("bag")}<span>Add</span></button>
        </div>
      </div>
    </article>`;
  }

  /* ---------------------------------------------------------
     CART (saved in the browser)
     --------------------------------------------------------- */
  const KEY = "st-cart-v1";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const lines = () => cart.map((l) => ({ ...l, p: PRODUCTS.find((x) => x.id === l.id) })).filter((l) => l.p);
  const count = () => lines().reduce((n, l) => n + l.qty, 0);

  function addToCart(id, color, qty = 1) {
    const hit = cart.find((l) => l.id === id && l.color === color);
    if (hit) hit.qty = Math.min(999, hit.qty + qty);
    else cart.push({ id, color, qty });
    save();
    renderCart();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`Added ${p.name} (${color}) to your cart`);
    $$(".cart-count").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
  }

  function renderCart() {
    const ls = lines();
    const n = count();
    $$("[data-cart-btn]").forEach((b) => {
      b.setAttribute("aria-label", `Open cart, ${n} ${n === 1 ? "item" : "items"}`);
      let badge = $(".cart-count", b);
      if (n > 0) {
        if (!badge) { badge = document.createElement("span"); badge.className = "cart-count"; b.appendChild(badge); }
        badge.textContent = n > 99 ? "99+" : n;
      } else if (badge) badge.remove();
    });
    const drawer = $("#cart-drawer");
    if (!drawer) return;
    $("[data-cart-total-count]", drawer).textContent = `(${n})`;
    const body = $("[data-cart-body]", drawer);

    if (!ls.length) {
      body.innerHTML = `<div class="empty"><span class="ring">${icon("bag")}</span><p class="h3">Your cart is empty</p><p class="text-muted">Find the right seat or tank cover for your ride.</p><a href="shop.html" class="btn btn--primary">Browse the shop</a></div>`;
      return;
    }
    const subtotal = ls.reduce((s, l) => s + l.qty * l.p.price, 0);
    const savings = ls.reduce((s, l) => s + l.qty * Math.max(0, (l.p.mrp || l.p.price) - l.p.price), 0);
    const msg = [
      `Hi ${S.name}, I'd like to place an order:`, "",
      ...ls.map((l, i) => `${i + 1}. ${l.p.name} — ${l.color} × ${l.qty} = ${inr(l.qty * l.p.price)}`),
      "", `Subtotal: ${inr(subtotal)}`, "", "Name:", "Delivery address:",
    ].join("\n");

    body.innerHTML = `
      <ul class="drawer__list">
        ${ls.map((l) => {
          const hex = (l.p.colors.find((c) => c[0] === l.color) || l.p.colors[0])[1];
          const key = esc(l.id + "::" + l.color);
          return `<li class="line">
            <div class="line__art">${art(l.p.category, hex, "", "", l.p.image)}</div>
            <div class="line__info">
              <strong>${esc(l.p.name)}</strong>
              <small>${esc(l.color)}${l.p.unit ? " · " + esc(l.p.unit) : ""}</small>
              <div class="line__row">
                <div class="qty">
                  <button type="button" data-qty="-1" data-key="${key}" aria-label="Decrease quantity of ${esc(l.p.name)}">${icon("minus")}</button>
                  <span>${l.qty}</span>
                  <button type="button" data-qty="1" data-key="${key}" aria-label="Increase quantity of ${esc(l.p.name)}">${icon("plus")}</button>
                </div>
                <b class="tabular">${inr(l.qty * l.p.price)}</b>
              </div>
            </div>
            <button type="button" class="line__remove" data-remove="${key}" aria-label="Remove ${esc(l.p.name)}">${icon("trash")}</button>
          </li>`;
        }).join("")}
      </ul>
      <div class="drawer__foot">
        ${savings > 0 ? `<p class="row save"><span>You save</span><span class="tabular">${inr(savings)}</span></p>` : ""}
        <p class="row"><span class="text-muted">Subtotal</span><span class="total tabular">${inr(subtotal)}</span></p>
        <small>Shipping & GST confirmed on WhatsApp. Ordering ${S.minWholesale}+ pieces? Ask for dealer pricing.</small>
        <a class="btn btn--primary btn--block btn--lg" href="${wa(msg)}" target="_blank" rel="noopener">${icon("whatsapp")}Order on WhatsApp</a>
      </div>`;
  }

  /* ---------------------------------------------------------
     DRAWER / MODAL (focus trap, Esc to close)
     --------------------------------------------------------- */
  let openPanel = null;
  let lastFocus = null;

  function openLayer(panel) {
    closeLayer(true);
    lastFocus = document.activeElement;
    openPanel = panel;
    panel.classList.add("is-open");
    panel.removeAttribute("inert");
    $("#overlay").classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => ($("[data-close]", panel) || panel).focus(), 50);
  }
  function closeLayer(silent) {
    if (!openPanel) return;
    openPanel.classList.remove("is-open");
    openPanel.setAttribute("inert", "");
    openPanel = null;
    $("#overlay").classList.remove("is-open");
    document.body.style.overflow = "";
    if (!silent && lastFocus) lastFocus.focus();
  }
  document.addEventListener("keydown", (e) => {
    if (!openPanel) return;
    if (e.key === "Escape") return closeLayer();
    if (e.key !== "Tab") return;
    const f = $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', openPanel);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  function quickView(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    const modal = $("#quick-view");
    if (!p || !modal) return;
    const [cName, cHex] = p.colors[0];
    const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    $("[data-modal-body]", modal).innerHTML = `
      <div class="modal__grid card group" data-id="${p.id}" data-color="${esc(cName)}" style="border:0;border-radius:0;transform:none">
        <div class="modal__art"><span class="art-slot">${art(p.category, cHex, catName(p.category).toUpperCase(), `${p.name} in ${cName}`, p.image)}</span>
          ${p.badge ? `<span class="card__badge">${esc(p.badge)}</span>` : ""}</div>
        <div class="modal__body">
          <div class="rating">${icon("star")}<b>${p.rating.toFixed(1)}</b><span>(${p.reviews} reviews)</span></div>
          <h2 class="h3" id="qv-title">${esc(p.name)}</h2>
          <ul class="spec-list">
            <li><span>Category</span><span>${esc(catName(p.category))}</span></li>
            <li><span>Material</span><span>${esc(p.material)}</span></li>
            <li><span>Fits</span><span>${esc(p.fits)}</span></li>
            ${p.unit ? `<li><span>Pack</span><span>${esc(p.unit)}</span></li>` : ""}
          </ul>
          <fieldset class="swatches">
            <legend class="sr-only">Colour</legend>
            ${p.colors.map(([n, h], i) => `<button type="button" class="swatch" data-swatch="${esc(n)}" data-hex="${h}" aria-pressed="${i === 0}" aria-label="${esc(n)}" title="${esc(n)}"><span style="background:${h}"></span></button>`).join("")}
            <span class="swatch-name">${esc(cName)}</span>
          </fieldset>
          <div class="modal__buy">
            <div style="margin-right:auto"><p class="price">${inr(p.price)}</p><p class="price-sub">${p.mrp ? `<s>${inr(p.mrp)}</s>` : ""}${off ? `${off}% off · ` : ""}${esc(p.unit || "per piece")}</p></div>
            <button type="button" class="btn btn--primary btn--lg" data-add="${p.id}">${icon("bag")}<span>Add to cart</span></button>
          </div>
        </div>
      </div>`;
    openLayer(modal);
  }

  /* ---------------------------------------------------------
     TOAST
     --------------------------------------------------------- */
  let toastTimer;
  function toast(text) {
    const r = $("#toast");
    if (!r) return;
    r.innerHTML = `<div class="toast">${icon("checkCircle")}<span>${esc(text)}</span></div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (r.innerHTML = ""), 3500);
  }

  /* ---------------------------------------------------------
     SHARED CHROME: header, footer, drawer, modal, FAB
     --------------------------------------------------------- */
  function renderChrome() {
    const nav = [["About", "index.html#about"], ["Products", "index.html#products"], ["Wholesale", "index.html#wholesale"], ["Why Us", "index.html#why-us"], ["FAQ", "index.html#faq"], ["Contact", "index.html#contact"]];
    const logo = `<a href="index.html" class="logo" aria-label="${esc(S.name)} — home">
      <svg viewBox="0 0 44 44" aria-hidden="true"><rect x="1" y="1" width="42" height="42" rx="12" fill="#ff5b1f"/><rect x="5" y="5" width="34" height="34" rx="8.5" fill="none" stroke="rgba(11,11,12,.55)" stroke-width="1.2" stroke-dasharray="3 2.4"/><text x="22" y="29.5" text-anchor="middle" fill="#0b0b0c" font-family="Big Shoulders Display, Impact, sans-serif" font-size="19" font-weight="900">ST</text></svg>
      <span class="logo__text"><span class="logo__name">${esc(S.name.split(" ")[0])}</span><span class="logo__sub">${esc(S.name.split(" ").slice(1).join(" ") || "Traders")}</span></span></a>`;

    $("#site-header").outerHTML = `
      <header class="site-header ${isShop ? "is-solid" : ""}" id="site-header">
        <a href="#main" class="skip-link">Skip to content</a>
        <div class="container">
          ${logo}
          <nav class="nav" aria-label="Primary"><ul>
            ${nav.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}
            <li><a href="shop.html" class="nav__shop ${isShop ? "is-active" : ""}" ${isShop ? 'aria-current="page"' : ""}>Shop</a></li>
          </ul></nav>
          <div class="header-actions">
            ${isShop ? "" : '<a href="shop.html" class="btn btn--primary">Shop Now</a>'}
            <button type="button" class="icon-btn" data-cart-btn aria-label="Open cart">${icon("bag")}</button>
            <button type="button" class="icon-btn menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon("menu")}</button>
          </div>
        </div>
      </header>
      <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile" hidden>
        ${[...nav, ["Shop", "shop.html"]].map(([l, h], i) => `<a class="mm-link" href="${h}" style="animation-delay:${i * 45}ms">${l}<span>0${i + 1}</span></a>`).join("")}
        <div class="mm-foot"><p>${esc(S.phone)}</p><p>${esc(S.hours)}</p></div>
      </nav>`;

    const socials = Object.entries(S.social).filter(([, u]) => u);
    $("#site-footer").outerHTML = `
      <footer class="footer">
        <div class="container footer__grid">
          <div class="footer__about">${logo}<p>${esc(S.description)}</p>
            <div class="socials">${socials.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}">${icon(k)}</a>`).join("")}</div>
          </div>
          <div><h2>Company</h2><ul>${nav.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul></div>
          <div><h2>Shop</h2><ul>${CATEGORIES.map((c) => `<li><a href="shop.html?category=${c.id}">${esc(c.name)}</a></li>`).join("")}</ul></div>
          <div><h2>Visit</h2><ul>
            <li>${esc(S.address)}</li>
            <li><a href="tel:${S.phone.replace(/\s/g, "")}">${esc(S.phone)}</a></li>
            <li><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li>
          </ul></div>
        </div>
        <div class="container"><div class="stitch-line" aria-hidden="true"></div></div>
        <div class="container footer__bottom"><p>© ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.</p><p>Retail · Wholesale · Custom — Made in India</p></div>
        <p class="footer__ghost" aria-hidden="true">${esc(S.name.split(" ")[0])}</p>
      </footer>`;

    document.body.insertAdjacentHTML("beforeend", `
      <div id="overlay" class="overlay"></div>
      <aside id="cart-drawer" class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1" inert>
        <div class="drawer__head"><h2 id="cart-title">Your cart <span data-cart-total-count></span></h2>
          <button type="button" class="icon-btn" data-close aria-label="Close cart">${icon("x")}</button></div>
        <div data-cart-body style="flex:1;display:flex;flex-direction:column;min-height:0"></div>
      </aside>
      <div id="quick-view" class="modal" role="dialog" aria-modal="true" aria-labelledby="qv-title" tabindex="-1" inert>
        <button type="button" class="icon-btn modal__close" data-close aria-label="Close">${icon("x")}</button>
        <div data-modal-body></div>
      </div>
      <div id="toast" class="toast-region" role="status" aria-live="polite"></div>
      <button type="button" class="icon-btn to-top" aria-label="Back to top">${icon("arrowUp")}</button>
      <a class="wa-fab" href="${wa(`Hi ${S.name}, I have an enquiry about your bike covers.`)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon("whatsapp")}</a>`);
  }

  /* Fill [data-site] placeholders in the HTML from config.js */
  function bindSite() {
    $$("[data-site]").forEach((el) => {
      const k = el.dataset.site;
      if (k === "year") el.textContent = S.established;
      else if (S[k] !== undefined) el.textContent = S[k];
    });
    $$("[data-site-img]").forEach((el) => (el.src = S.images[el.dataset.siteImg]));
    $$("[data-href]").forEach((el) => {
      const k = el.dataset.href;
      el.href = k === "tel" ? `tel:${S.phone.replace(/\s/g, "")}` : k === "mail" ? `mailto:${S.email}` : k === "map" ? S.mapsUrl : wa(el.dataset.msg || `Hi ${S.name}!`);
    });
  }

  /* ---------------------------------------------------------
     GLOBAL CLICK HANDLING
     --------------------------------------------------------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a, #overlay");
    if (!t) return;

    if (t.id === "overlay" || t.hasAttribute("data-close")) return closeLayer();
    if (t.hasAttribute("data-cart-btn")) return openLayer($("#cart-drawer"));
    if (t.classList.contains("to-top")) return window.scrollTo({ top: 0, behavior: "smooth" });

    if (t.classList.contains("menu-toggle")) {
      const menu = $("#mobile-menu");
      const open = menu.hidden;
      menu.hidden = !open;
      t.setAttribute("aria-expanded", open);
      t.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      t.innerHTML = icon(open ? "x" : "menu");
      $("#site-header").classList.toggle("is-solid", open || scrollY > 24 || isShop);
      document.body.style.overflow = open ? "hidden" : "";
      return;
    }
    if (t.classList.contains("mm-link")) {
      $("#mobile-menu").hidden = true;
      document.body.style.overflow = "";
      const btn = $(".menu-toggle");
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = icon("menu");
      return;
    }

    if (t.dataset.swatch) {
      const card = t.closest("[data-id]");
      const p = PRODUCTS.find((x) => x.id === card.dataset.id);
      card.dataset.color = t.dataset.swatch;
      $$(".swatch", card).forEach((s) => s.setAttribute("aria-pressed", s === t));
      $(".swatch-name", card).textContent = t.dataset.swatch;
      if (!p.image) $(".art-slot", card).innerHTML = art(p.category, t.dataset.hex, catName(p.category).toUpperCase(), `${p.name} in ${t.dataset.swatch}`);
      return;
    }
    if (t.dataset.quick) return quickView(t.dataset.quick);
    if (t.dataset.add) {
      const card = t.closest("[data-id]");
      addToCart(t.dataset.add, card.dataset.color);
      const label = $("span", t);
      t.classList.add("is-added");
      const old = label.textContent;
      label.textContent = "Added";
      setTimeout(() => { t.classList.remove("is-added"); label.textContent = old; }, 1500);
      return;
    }
    if (t.dataset.qty) {
      const [id, color] = t.dataset.key.split("::");
      const l = cart.find((x) => x.id === id && x.color === color);
      if (l) { l.qty += Number(t.dataset.qty); if (l.qty <= 0) cart = cart.filter((x) => x !== l); }
      save(); renderCart();
      $("#cart-drawer [data-close]").focus();
      return;
    }
    if (t.dataset.remove) {
      const [id, color] = t.dataset.remove.split("::");
      cart = cart.filter((x) => !(x.id === id && x.color === color));
      save(); renderCart(); toast("Item removed from cart");
      $("#cart-drawer [data-close]").focus();
    }
  });

  /* ---------------------------------------------------------
     FORMS → WhatsApp
     --------------------------------------------------------- */
  function initForms() {
    $$("form[data-wa-form]").forEach((form) => {
      const check = (el) => {
        const v = el.value.trim();
        let msg = "";
        if (el.required && !v) msg = el.dataset.err || "This field is required.";
        else if (el.type === "tel" && v && el.required) {
          const d = v.replace(/\D/g, "").replace(/^91/, "");
          if (d.length !== 10) msg = "Enter a 10-digit mobile number, e.g. 98765 43210.";
        } else if (el.type === "number" && v && el.min && Number(v) < Number(el.min)) msg = `Minimum is ${el.min} pieces.`;
        const box = el.closest(".field");
        let err = $(".error", box);
        if (msg) {
          if (!err) { err = document.createElement("p"); err.className = "error"; err.id = el.id + "-err"; err.setAttribute("role", "alert"); box.appendChild(err); }
          err.textContent = msg;
          el.setAttribute("aria-invalid", "true");
          el.setAttribute("aria-describedby", err.id);
        } else {
          if (err) err.remove();
          el.removeAttribute("aria-invalid");
          el.removeAttribute("aria-describedby");
        }
        return !msg;
      };
      $$("input, select, textarea", form).forEach((el) => el.addEventListener("blur", () => check(el)));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const els = $$("input, select, textarea", form);
        const bad = els.filter((el) => !check(el));
        if (bad.length) return bad[0].focus();
        const lines = [`*${form.dataset.waForm} — ${S.name}*`];
        els.forEach((el) => { const v = el.value.trim(); if (v) lines.push(`${el.dataset.label || el.name}: ${v}`); });
        window.open(wa(lines.join("\n")), "_blank", "noopener");
        const box = form.parentElement;
        const html = form.outerHTML;
        box.innerHTML = `<div class="form-success" role="status">${icon("checkCircle")}<h3 class="h3">Message ready on WhatsApp</h3><p>Tap send in WhatsApp and we'll reply shortly.</p><button type="button" class="btn btn--ghost" style="margin-top:24px" data-reset-form>Send another</button></div>`;
        $("[data-reset-form]", box).addEventListener("click", () => { box.innerHTML = html; initForms(); });
      });
    });
  }

  /* ---------------------------------------------------------
     SCROLL EFFECTS: header, reveal, counters, back-to-top
     --------------------------------------------------------- */
  function initScroll() {
    const header = $("#site-header");
    const top = $(".to-top");
    const onScroll = () => {
      if (!isShop && $("#mobile-menu").hidden) header.classList.toggle("is-solid", scrollY > 24);
      top.classList.toggle("is-visible", scrollY > 900);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = $$(".reveal");
    const counters = $$("[data-count]");
    if (!("IntersectionObserver" in window) || reduce) {
      reveals.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const t0 = performance.now();
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString("en-IN") + suffix;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------------------------------------------------------
     HOME PAGE
     --------------------------------------------------------- */
  function initHome() {
    const cats = $("#cat-grid");
    if (cats) {
      cats.innerHTML = CATEGORIES.map((c, i) => `
        <li class="reveal" style="--d:${i * 70}ms">
          <a href="shop.html?category=${c.id}" class="cat-card stitch group">
            <div class="cat-card__art">${art(c.id, c.tint, "0" + (i + 1), "")}</div>
            <div class="cat-card__body">
              <h3 class="h3">${esc(c.name)}</h3>
              <p>${esc(c.blurb)}</p>
              <div class="cat-card__foot"><span class="mono-label">From <b>${inr(c.from)}</b></span><span class="round-arrow">${icon("arrowUpRight")}</span></div>
            </div>
          </a>
        </li>`).join("");
    }
    const feat = $("#featured-grid");
    if (feat) {
      feat.innerHTML = PRODUCTS.filter((p) => p.badge === "Bestseller" || p.badge === "New").slice(0, 4)
        .map((p, i) => `<li class="reveal" style="--d:${i * 70}ms">${cardHTML(p)}</li>`).join("");
    }
    const hc = $("#hero-card");
    if (hc) {
      const p = PRODUCTS.find((x) => x.badge === "Bestseller") || PRODUCTS[0];
      hc.innerHTML = `
        <div class="hero-card__art">${art(p.category, p.colors[1] ? p.colors[1][1] : p.colors[0][1], "BESTSELLER", p.name, p.image)}</div>
        <div class="hero-card__body">
          <p class="mono-label live">In stock · ships today</p>
          <p class="h3" style="font-size:1.4rem;margin-top:10px">${esc(p.name)}</p>
          <div class="hero-card__row">
            <div><p class="price">${inr(p.price)}</p><p class="price-sub">${p.mrp ? `<s>${inr(p.mrp)}</s>` : ""}per piece</p></div>
            <a href="shop.html?category=${p.category}" class="btn btn--ghost" style="min-height:44px">View ${icon("arrowRight", 'class="arrow"')}</a>
          </div>
        </div>`;
    }
    const ws = $("#ws-min");
    if (ws) ws.textContent = S.minWholesale;
    $$("[data-min]").forEach((el) => { el.min = S.minWholesale; el.placeholder = S.minWholesale + "+"; });
  }

  /* ---------------------------------------------------------
     SHOP PAGE
     --------------------------------------------------------- */
  function initShop() {
    const grid = $("#shop-grid");
    if (!grid) return;
    const params = new URLSearchParams(location.search);
    let filter = CATEGORIES.some((c) => c.id === params.get("category")) ? params.get("category") : "all";
    let query = "";
    let sort = "featured";

    const chips = $("#chips");
    const tabs = [["all", "All products", PRODUCTS.length], ...CATEGORIES.map((c) => [c.id, c.name, PRODUCTS.filter((p) => p.category === c.id).length])];
    chips.innerHTML = tabs.map(([id, l, n]) => `<button type="button" class="chip" data-filter="${id}" aria-pressed="${id === filter}">${esc(l)} <small>${n}</small></button>`).join("");

    const render = () => {
      const q = query.toLowerCase();
      const list = PRODUCTS
        .filter((p) => filter === "all" || p.category === filter)
        .filter((p) => !q || [p.name, p.fits, p.material, ...p.colors.map((c) => c[0])].join(" ").toLowerCase().includes(q))
        .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);
      $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", c.dataset.filter === filter));
      $("#result-count").innerHTML = `Showing <b>${list.length}</b> ${list.length === 1 ? "product" : "products"}${filter !== "all" ? " in " + esc(catName(filter)) : ""}${query ? ` matching “${esc(query)}”` : ""}`;
      $("#no-results").hidden = list.length > 0;
      grid.innerHTML = list.map((p, i) => `<li class="rise" style="--d:${Math.min(i, 8) * 40}ms">${cardHTML(p)}</li>`).join("");
    };

    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      filter = b.dataset.filter;
      try { history.replaceState(null, "", filter === "all" ? location.pathname : `?category=${filter}`); } catch (err) {}
      render();
    });
    let deb;
    $("#search").addEventListener("input", (e) => { clearTimeout(deb); deb = setTimeout(() => { query = e.target.value.trim(); render(); }, 150); });
    $("#sort").addEventListener("change", (e) => { sort = e.target.value; render(); });
    $("#clear-filters").addEventListener("click", () => { filter = "all"; query = ""; $("#search").value = ""; render(); });
    render();
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  renderChrome();
  bindSite();
  initHome();
  initShop();
  hydrateIcons();
  renderCart();
  initForms();
  initScroll();
})();
