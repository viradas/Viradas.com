// ==========================
// 1. LOAD HEADER & FOOTER
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  // === LOAD HEADER ===
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("site-header");
      if (header) header.innerHTML = html;
    });

  // === LOAD FOOTER ===
  fetch("/footer.html")
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("site-footer");
      if (footer) footer.innerHTML = html;

      // ---- INIT LEGAL POPUP AFTER FOOTER LOAD ----
      initLegalPopup();
    });

  // Init functions
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

  if (!steps.length || !box) return;

  const content = {
    verita: { title: "Verità", text: "Riconoscere ciò che accade senza giudizio." },
    identita: { title: "Identità", text: "Chi sei oggi, cosa senti, cosa desideri." },
    relazione: { title: "Relazione", text: "Contatto, bisogni, confini, dinamiche." },
    assertivita: { title: "Assertività", text: "Saper dire sì/no, chiedere, negoziare." },
    direzione: { title: "Direzione", text: "Che cosa dà senso al tuo percorso." },
    azione: { title: "Azione", text: "Passi concreti, realistici e sostenibili." },
    svolta: { title: "Svolta", text: "Integrare e consolidare il cambiamento." }
  };

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

