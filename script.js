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
    initQuiz();


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

  const content = {
    verita: { title: "Verità", text: "Riconoscere ciò che sta davvero accadendo, senza giudizio e senza evasione." },
    identita: { title: "Identità", text: "Vedere chi sei oggi, cosa senti, cosa desideri, cosa ti nutre e cosa ti blocca." },
    relazione: { title: "Relazione", text: "Esplorare il modo in cui entri in contatto: confini, bisogni, dinamiche ricorrenti." },
    assertivita: { title: "Assertività", text: "Allenare la capacità di dire sì/no, chiedere, negoziare, comunicare con chiarezza." },
    direzione: { title: "Direzione", text: "Capire verso dove vuoi muoverti davvero e che cosa dà senso al percorso." },
    azione: { title: "Azione", text: "Tradurre desideri e bisogni in passi concreti, realistici e rispettosi dei tempi." },
    svolta: { title: "Svolta", text: "Integrare ciò che hai scoperto e consolidare il cambiamento nella vita quotidiana." }
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

/* === QUIZ PERCORSI AGGIORNATO (Versione Consapevolezza e Slancio) === */

function initQuiz() {
  const steps = [
    {
      id: 1,
      multi: false,
      question: "Quale sensazione ti accompagna in questo periodo?",
      options: [
        { tag: "relazione", text: "Mi sento stretta/o, come se non avessi spazio e tempo per essere o fare ciò che vorrei." },
        { tag: "strumenti", text: "Non mi sento capace come vorrei, qualcosa mi manca o mi frena." },
        { tag: "corpo", text: "Vivo una pressione continua, come se dovessi sempre reggere qualcosa." },
        { tag: "vuoto", text: "Sento una mancanza di slancio, come se avessi perso interesse." }
      ]
    },
    {
      id: 2,
      multi: false,
      question: "Cosa pensi che potrebbe aiutarti o alleggerirti un po’ in questo periodo?",
      options: [
        { tag: "relazione", text: "Cambiare sguardo e capire cosa voglio davvero, cosa mi fa bene." },
        { tag: "strumenti", text: "Sapere come muovermi per cambiare la situazione, passo per passo." },
        { tag: "corpo", text: "Ritrovare energia e vitalità, sento troppa fatica." },
        { tag: "vuoto", text: "Sentire di nuovo uno scopo o un desiderio per qualcosa." }
      ]
    },
    {
      id: 3,
      multi: true,
      question: "Dove si manifesta di più questa difficoltà?",
      options: [
        { tag: "relazione", text: "Con le persone: mi adatto, non dico di no, non mi sento vista/o." },
        { tag: "strumenti", text: "Nelle decisioni: rimando, non mi muovo, mi sento bloccata/o." },
        { tag: "corpo", text: "Nel corpo: tensione costante, stanchezza che non passa col riposo, senso di peso." },
        { tag: "orientamento", text: "Nei pensieri: o la testa è sempre accesa (rimuginio) o la sento vuota e fatico a concentrarmi." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "Cosa pensi di questi segnali oggi?",
      options: [
        { tag: "corpo", text: "Li collego soprattutto a stress o periodi difficili." },
        { tag: "orientamento_cond", text: "Ho situazioni o condizioni già note e me ne sto già occupando." },
        { tag: "ascoltare", text: "Sento che sono segnali importanti che vanno ascoltati con cura." },
        { tag: "umore_clinico", text: "Mi preoccupa questo senso di vuoto o di stanchezza profonda." },
        { tag: "fanno_male", text: "Mi accorgo che alcune abitudini o reazioni non mi fanno più bene." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "Cosa senti di poter fare, senza forzarti, in questo momento?",
      options: [
        { tag: "riflessione", text: "Fermarmi e dare un senso a quello che sto vivendo." },
        { tag: "azione", text: "Provare a fare qualcosa di diverso, anche in modo piccolo e concreto." },
        { tag: "corpo", text: "Rimettere ordine nelle mie abitudini quotidiane." },
        { tag: "supporto", text: "Valutare se questi segnali meritano anche uno sguardo sanitario o psicologico." }
      ]
    }
  ];

  let currentStep = 0;
  let answers = {};

  const container = document.getElementById("step-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const resultBox = document.getElementById("result");

  if (!container || !prevBtn || !nextBtn || !restartBtn || !resultBox) {
    console.warn("Quiz: elementi mancanti");
    return;
  }

  function renderStep() {
    const step = steps[currentStep];
    const hintText = step.multi
      ? "<b>PIÙ</b> risposte possibili."
      : "<b>UNA</b> sola risposta: quella che senti più forte adesso.";

    container.innerHTML = `
      <div class="question">
        <h3>${step.question}</h3>
        <p class="question-hint">${hintText}</p>
        <div class="options">
          ${step.options.map(o => `
            <div class="option-card ${(answers[step.id] || []).includes(o.tag) ? "selected" : ""}" data-tag="${o.tag}">
              <span>${o.text}</span>
            </div>
          `).join("")}
        </div>
        <p class="hint-error hidden">Scegli almeno una risposta per continuare.</p>
      </div>
    `;

    const hintError = container.querySelector(".hint-error");

    container.querySelectorAll(".option-card").forEach(card => {
      card.onclick = () => {
        const tag = card.dataset.tag;

        if (step.multi) {
          const selected = answers[step.id] || [];
          answers[step.id] = selected.includes(tag)
            ? selected.filter(t => t !== tag)
            : [...selected, tag];
          renderStep(); // per aggiornare selected UI
        } else {
          answers[step.id] = [tag];
          renderStep(); // resta sulla stessa domanda (serve Avanti)
        }

        // se seleziono qualcosa, nascondo l'errore
        if (hintError) hintError.classList.add("hidden");
      };
    });

    prevBtn.disabled = currentStep === 0;
  }

  function showResult() {
    container.innerHTML = "";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    const allTags = Object.values(answers).flat();
    const hasTag = (tag) => allTags.includes(tag);
    const countTag = (tag) => allTags.filter(t => t === tag).length;

    const corpoForte = countTag("corpo") >= 2;

    let title = "";
    let message = "";

    // RISULTATO 1 — SLANCIO BASSO / VUOTO
    if (hasTag("umore_clinico") || hasTag("vuoto")) {
      title = "Ritrovare una scintilla, con gentilezza";
      message = `
        <p>In questo periodo può esserci meno energia, meno interesse o meno spinta. Non è qualcosa da risolvere subito, ma un segnale che merita attenzione.</p>
        <p>Quando lo slancio è basso, forzare decisioni o cambiamenti spesso aumenta la fatica. Può essere più utile fermarsi e osservare cosa sta succedendo.</p>
        <p><strong>Può essere utile oggi:</strong>notare da quanto tempo senti questo calo e in quali momenti è più evidente. Anche solo distinguere “quando sì” e “quando no” può dare più chiarezza.</p>
        <p>Se questa sensazione è intensa, dura nel tempo o ti preoccupa, può avere senso valutare anche uno sguardo sanitario o psicologico, come parte della cura di sé.</p>
      `;
    }

    // RISULTATO 2 — PRESSIONE / CORPO / ABITUDINI
    else if (hasTag("fanno_male") || corpoForte) {
      title = "Allentare la pressione, un passo alla volta";
      message = `
        <p>Qui emergono segnali di carico: tensione, stanchezza o la sensazione che alcune abitudini non funzionino più come prima. Riconoscerlo è già un passaggio importante.</p>
        <p>In queste fasi è spesso più utile togliere qualcosa piuttosto che aggiungere nuovi obiettivi o cambiamenti drastici.</p>
        <p><strong>Può essere utile oggi:</strong><br>
        scegliere un solo momento della giornata in cui senti più pressione e chiederti cosa la aumenta e cosa, anche poco, la riduce. Non per cambiare tutto, ma per capire dove intervenire con meno sforzo.</p>
        <p>Se stai già seguendo percorsi di cura, questa osservazione può affiancarli in modo pratico.</p>
      `;
    }

    // RISULTATO 3 — ORIENTAMENTO / RELAZIONI / RUOLI
    else {
      title = "Creare spazio e orientamento";
      message = `
        <p>Qui non emerge un’urgenza, ma il bisogno di fare ordine. Qualcosa può stare diventando stretto: una relazione, un ruolo o un modo abituale di funzionare.</p>
        <p>Non serve decidere subito cosa fare. Prima può essere utile capire meglio cosa sta chiedendo spazio.</p>
        <p><strong>Può essere utile oggi:</strong><br>
        individuare una situazione in cui ti adatti più del necessario e chiederti cosa stai tenendo in piedi e perché. Anche solo chiarirlo a te stessa/o può creare più margine.</p>
      `;
    }

    // Nota su condizioni già note
    if (hasTag("orientamento_cond")) {
      message += `
        <div class="note-box">
          <p><em>Se hai situazioni o condizioni già note e seguite, questo tipo di osservazione può affiancare in modo utile i percorsi che stai già facendo.</em></p>
        </div>
      `;
    }

    // Nota di confine (una sola, niente duplicati)
    message += `
      <p class="micro-note"><em>Questo quiz è uno strumento di orientamento e riflessione. Non fornisce diagnosi né sostituisce valutazioni o percorsi medici o psicoterapeutici.</em></p>
    `;

    resultBox.innerHTML = `<h3>${title}</h3>${message}`;
    resultBox.classList.remove("hidden");
  }

  // Event Listeners
  nextBtn.onclick = () => {
    const stepId = steps[currentStep].id;
    if (!answers[stepId] || answers[stepId].length === 0) {
      const err = container.querySelector(".hint-error");
      if (err) err.classList.remove("hidden");
      return;
    }

    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      showResult();
    }
  };

  prevBtn.onclick = () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  };

  restartBtn.onclick = () => {
    currentStep = 0;
    answers = {};
    resultBox.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    restartBtn.classList.add("hidden"); // opzionale: se lo gestisci via CSS, ok anche senza
    renderStep();
  };

  renderStep();
}

initQuiz();


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
