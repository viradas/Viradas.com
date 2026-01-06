// ==========================
// 1. LOAD HEADER & FOOTER (language-aware)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Detect language folder from path: /en/, /de/, /es/, /fr/, /pt/ (default: root IT)
  const m = window.location.pathname.match(/^\/(en|de|es|fr|pt)\//i);
  const langPrefix = m ? `/${m[1].toLowerCase()}` : "";

  // === LOAD HEADER ===
 fetch(`${langPrefix}/header.html`)
  .then(res => res.text())
  .then(html => {
    const header = document.getElementById("site-header");
    if (header) header.innerHTML = html;

    // IMPORTANTISSIMO: init dopo che l'header esiste nel DOM
    initMenu();
    initLangSwitch();   // <-- nuova
  })
  .catch(err => console.error("Header load error:", err));


  // === LOAD FOOTER ===
  fetch(`${langPrefix}/footer.html`)
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("site-footer");
      if (footer) footer.innerHTML = html;

      // init legal popup only after footer exists
      initLegalPopup();
    })
    .catch(err => console.error("Footer load error:", err));

  // Init functions (safe even if some elements are missing)
  initMenu();
  initReveal();
  initStepButtons();
  initFAQ();
  initPopupThankYou();
});


     

// ==========================
// MOBILE MENU
// ==========================
function initMenu() {
  window.toggleMenu = function () {
    const ul = document.getElementById("menuList");
    if (ul) ul.classList.toggle("show");
  };
}


// ==========================
// REVEAL ON SCROLL
// ==========================
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  function show() {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", show);
  show();
}


// ==========================
// VIRADAS STEP BUTTONS
// ==========================
function initStepButtons() {
  const steps = document.querySelectorAll(".step");
  const box = document.getElementById("step-explanation");
  const title = document.getElementById("step-title");
  const text = document.getElementById("step-text");

  // 👉 se NON siamo nella pagina del metodo, esce senza errori
  if (!steps.length || !box || !title || !text) return;

  const content = window.VIRADAS_STEP_CONTENT || {};


  steps.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.step;
      const info = content[key];
      if (!info) return;

      title.textContent = info.title;
      text.textContent = info.text;

      box.classList.add("open");
      steps.forEach(s => s.classList.remove("active-step"));
      btn.classList.add("active-step");
    });
  });
}


// ==========================
// FAQ
// ==========================
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const ans = q.nextElementSibling;
      const item = q.parentElement;
      const open = ans.classList.contains("open");

      document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("open"));
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));

      if (!open) {
        ans.classList.add("open");
        item.classList.add("open");
      }
    });
  });
}


// ==========================
// THANK YOU POPUP
// ==========================
function initPopupThankYou() {
  const params = new URLSearchParams(window.location.search);
  const popup = document.getElementById("thanksPopup");

  if (params.get("sent") === "1" && popup) {
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 4000);
  }
}


// ==========================
// LEGAL POPUP
// ==========================
function initLegalPopup() {
  const legalModal = document.getElementById("legalModal");
  const openLegal = document.getElementById("open-legal");
  const closeLegal = document.getElementById("closeLegal");
  const cookieBanner = document.getElementById("cookie-banner");

  if (!legalModal || !openLegal || !closeLegal) return;

  openLegal.addEventListener("click", (e) => {
    e.preventDefault();
    legalModal.style.display = "flex";

    // 👇 FIX MOBILE: nascondi cookie banner mentre il popup è aperto
    if (cookieBanner) cookieBanner.style.display = "none";
  });

  closeLegal.addEventListener("click", () => {
    legalModal.style.display = "none";

    // 👇 FIX MOBILE: ri-mostra il banner solo se l’utente non ha ancora scelto
    if (!localStorage.getItem("cookie-consent") && cookieBanner)
      cookieBanner.style.display = "block";
  });

  window.addEventListener("click", (e) => {
    if (e.target === legalModal) {
      legalModal.style.display = "none";

      if (!localStorage.getItem("cookie-consent") && cookieBanner)
        cookieBanner.style.display = "block";
    }
  });
}


// ==========================
// TO TOP BUTTON
// ==========================
const toTop = document.getElementById("toTop");
if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* === COOKIE BANNER LOGIC === */

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");

  // 1. Se l'utente NON ha ancora scelto → mostra banner
  if (!localStorage.getItem("cookie-consent")) {
    banner.style.display = "block";
  } else {
    // Se ha già accettato → carica Google Analytics
    if (localStorage.getItem("cookie-consent") === "accepted") {
      loadGA();
    }
  }

  // fallback mobile se un click viene bloccato da overlay
  document.getElementById("cookie-decline").addEventListener("touchstart", function () {
    localStorage.setItem("cookie-consent", "declined");
    document.getElementById("cookie-banner").style.display = "none";
  });


  // 2. ACCETTA
  document.getElementById("cookie-accept").addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "accepted");
    banner.style.display = "none";
    loadGA(); // carica GA solo dopo consenso
  });

  // 3. RIFIUTA
  document.getElementById("cookie-decline").addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    banner.style.display = "none";
  });
});

/* === FUNZIONE: CARICA GOOGLE ANALYTICS SOLO DOPO CONSENSO === */

function loadGA() {
  // evita doppio caricamento
  if (window.gaLoaded) return;
  window.gaLoaded = true;

  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
  document.head.appendChild(gtagScript);

  gtagScript.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  };
}



// ==========================
// TO TOP VISIBILITY
// ==========================
const toTopBtn = document.getElementById("toTop");

if (toTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }
  });
}


// === Language switch (mobile) ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".lang-current");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.parentElement.classList.toggle("open");
  });
});

// === Language switch: active label + hide current language ===
document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.querySelector(".lang-switch");
  if (!langSwitch) return;

  const currentBtn = langSwitch.querySelector(".lang-current");
  const menuLinks = langSwitch.querySelectorAll(".lang-menu a");

  // Detect language from path: /en/, /de/, /es/, /fr/, /pt/ (default it)
  const path = window.location.pathname;
  const match = path.match(/^\/(en|de|es|fr|pt)\//i);
  const currentLang = match ? match[1].toLowerCase() : "it";

  // Update button label (IT ▾, EN ▾, ...)
  const caret = currentBtn.querySelector(".lang-caret");
  currentBtn.innerHTML = `${currentLang.toUpperCase()} <span class="lang-caret" aria-hidden="true">▾</span>`;

  // Hide current language in dropdown
  menuLinks.forEach(a => {
    const code = (a.getAttribute("lang") || a.textContent || "").trim().toLowerCase();
    const li = a.closest("li");
    if (!li) return;

    if (code === currentLang) {
      li.style.display = "none";
    } else {
      li.style.display = "";
    }
  });
});


function initLangSwitch() {
  const langSwitch = document.querySelector(".lang-switch");
  if (!langSwitch) return;

  const currentBtn = langSwitch.querySelector(".lang-current");
  const menuLinks = langSwitch.querySelectorAll(".lang-menu a");
  if (!currentBtn || !menuLinks.length) return;

  // ---- detect current language ----
  const path = window.location.pathname; // es: /pt/guide.html
  const match = path.match(/^\/(en|de|es|fr|pt)\//i);
  const currentLang = match ? match[1].toLowerCase() : "it";

  // Base path without language prefix (keeps same page: /guide.html)
  const basePath = path.replace(/^\/(en|de|es|fr|pt)\//i, "/");

  // ---- update button label ----
  currentBtn.innerHTML = `${currentLang.toUpperCase()} <span class="lang-caret" aria-hidden="true">▾</span>`;

  // ---- open/close dropdown (mobile-friendly) ----
  const toggleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    langSwitch.classList.toggle("open");
  };

  // Usa pointerup (migliore su touch), ma mantieni anche click come fallback
  currentBtn.addEventListener("pointerup", toggleOpen);
  currentBtn.addEventListener("click", toggleOpen);
  currentBtn.addEventListener("touchstart", toggleOpen, { passive: false });

  // ---- build correct URLs + hide current language ----
  menuLinks.forEach(a => {
    // leggi il codice lingua da data-lang oppure lang oppure testo
    const code = (
      a.getAttribute("data-lang") ||
      a.getAttribute("lang") ||
      a.textContent
    ).trim().toLowerCase();

    const li = a.closest("li");
    if (li) li.style.display = (code === currentLang) ? "none" : "";

    // costruisci URL "equivalente" mantenendo pagina + query + hash
    // it = root, altre lingue = /xx/
    const targetPath = (code === "it") ? basePath : `/${code}${basePath}`;
    const targetUrl = `${targetPath}${window.location.search}${window.location.hash}`;

    // imposta href (utile per long-press e accessibilità)
    a.setAttribute("href", targetUrl);

    // su mobile forziamo la navigazione con pointerup/touchstart
    const go = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = targetUrl;
    };
    a.addEventListener("pointerup", go);
    a.addEventListener("click", go);
    a.addEventListener("touchstart", go, { passive: false });
  });

  // ---- close dropdown when tapping outside ----
  const closeIfOutside = (e) => {
    if (!langSwitch.contains(e.target)) langSwitch.classList.remove("open");
  };
  document.addEventListener("pointerdown", closeIfOutside);
  document.addEventListener("click", closeIfOutside);
}



document.addEventListener("DOMContentLoaded", () => {
  initStepButtons();
});
