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

/* === QUIZ PERCORSI === */


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
      { tag: "orientamento", text: "Faccio fatica a immaginare una vita serena o soddisfatta." }
    ]
  },

  {
    id: 2,
    multi: false,
    question: "Cosa ti manca di più in questo momento?",
    options: [
      { tag: "relazione", text: "Cambiare sguardo e capire cosa voglio davvero, cosa mi fa bene." },
      { tag: "strumenti", text: "Sapere come muovermi, cosa fare, passo per passo." },
      { tag: "corpo", text: "Più energia, meno fatica, meno alti e bassi." },
      { tag: "orientamento", text: "Capire se è solo stress o se c’è altro." }
    ]
  },

  {
    id: 3,
    multi: true,
    question: "Dove si manifesta di più questa difficoltà?",
    options: [
      { tag: "relazione", text: "Con le persone e nei ruoli: mi adatto, non dico di no, non mi sento vista/o." },
      { tag: "strumenti", text: "Nel comportamento, nelle scelte e nelle decisioni: rimando, non mi muovo." },
      { tag: "corpo", text: "Nel corpo e nell'energia: sento sempre tensione, stanchezza, sonno, gonfiore, stress." },
      { tag: "orientamento", text: "Nei pensieri: rimugino, valuto e interpreto in continuazione, la testa rimane sempre accesa." }
    ]
  },

  {
    id: 4,
    multi: true,
    question: "Come leggi tutti questi segnali?",
    options: [
      { tag: "corpo", text: "Li collego soprattutto a stress o periodi difficili." },
      { tag: "orientamento_cond", text: "Ho condizioni già note che conosco e seguo." },
      { tag: "orientamento_medi", text: "Non so come leggerli, ma sento che vanno ascoltati." },
      { tag: "orientamento_preoc", text: "Alcuni segnali mi preoccupano." },
      { tag: "orientamento_male", text: "Mi accorgo che alcune abitudini o reazioni non mi fanno bene." }
    ]
  },

  {
    id: 5,
    multi: true,
    question: "Quale passo senti possibile ora?",
    options: [
      { tag: "relazione", text: "Fermarmi e dare senso a quello che sto vivendo." },
      { tag: "strumenti", text: "Provare a fare qualcosa di diverso, anche in modo piccolo e concreto." },
      { tag: "corpo", text: "Rimettere un po' di ordine nelle mie abitudini quotidiane." },
      { tag: "orientamento", text: "Capire se serve un tipo di supporto diverso." }
      // Varianti commentate:
      // "Capire se non basta solo orientarsi."
      // "Capire se serve un lavoro più profondo."
    ]
  },

];

let currentStep = 0;
let answers = {};

const container = document.getElementById("step-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultBox = document.getElementById("result");

if (!container || !prevBtn || !nextBtn || !restartBtn || !resultBox) {
  console.warn("Quiz: elementi mancanti (step-container / prevBtn / nextBtn / restartBtn / result)");
} else {

  function renderStep() {
    const step = steps[currentStep];
    const selected = answers[step.id] || [];

    const hintText = step.multi
      ? "Qui puoi scegliere più risposte, senza forzare."
      : "Scegli <b>una</b> sola risposta: quella che senti più forte adesso. <br> Ti occuperai anche degli altri aspetti, ma un passo alla volta.";

    container.innerHTML = `
      <div class="question">
        <h3>${step.question}</h3>

        <p class="question-hint">
          ${hintText}
        </p>

        <div class="options">
          ${step.options.map(o => `
            <div class="option-card ${ (answers[step.id] || []).includes(o.tag) ? "selected" : "" }"
                data-tag="${o.tag}">
              <span>${o.text}</span>
            </div>
          `).join("")}
        </div>

        <p class="hint hidden">Scegli almeno una risposta per continuare.</p>
      </div>
    `;

   document.querySelectorAll(".option-card").forEach(card => {
  card.onclick = () => {
    const tag = card.dataset.tag;

    if (step.multi) {
      // risposte multiple: resta sulla domanda
      answers[step.id] = selected.includes(tag)
        ? selected.filter(t => t !== tag)
        : [...selected, tag];
      renderStep();
    } else {
      // risposta singola: seleziona e vai avanti
      answers[step.id] = [tag];

      if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
      } else {
        showResult();
      }
    }
  };
});

    prevBtn.disabled = currentStep === 0;
  }

  nextBtn.onclick = () => {
    const selected = answers[steps[currentStep].id];
    if (!selected || selected.length === 0) {
      document.querySelector(".hint").classList.remove("hidden");
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
    currentStep--;
    renderStep();
  };

  restartBtn.onclick = () => {
    // reset logica
    currentStep = 0;
    answers = {};

    // reset UI
    resultBox.classList.add("hidden");
    nextBtn.classList.remove("hidden");

    // ricarica prima domanda (nessuna selezione)
    renderStep();
  };


  function getFlags() {
    const flags = {
      condizioni: false,
      ascoltare: false,
      preoccupano: false,
      fanno_male: false,
      supporto_diverso: false
    };

    const score = getPercorsiScore();
    const sorted = Object.entries(score)
      .sort((a, b) => b[1] - a[1])
      .filter(([, v]) => v > 0);

    const primary = sorted[0]?.[0];
    const secondary = sorted[1]?.[0];

    Object.values(answers).flat().forEach(tag => {
      if (tag === "orientamento_cond") flags.condizioni = true;
      if (tag === "orientamento_medi") flags.ascoltare = true;
      if (tag === "orientamento_preoc") flags.preoccupano = true;
      if (tag === "orientamento_male") flags.fanno_male = true;
      if (tag === "orientamento") flags.supporto_diverso = true;
    });

    return flags;
  }

  function getPercorsiScore() {
    const score = {
      relazione: 0,
      strumenti: 0,
      corpo: 0
    };

    Object.values(answers).flat().forEach(tag => {
      if (score[tag] !== undefined) {
        score[tag] += 1;
      }
    });

    return score;
  }


  function showResult() {
  container.innerHTML = "";
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");

  const flags = getFlags();
  let message = "";

  // 1️⃣ MESSAGGIO PRINCIPALE (come prima)
  if (flags.preoccupano) {
    message = `
      <p><strong>Quando qualcosa chiede più ascolto.</strong></p>
      <p>
        Quando qualcosa inizia a preoccupare, fermarsi non è un segno di debolezza,
        ma un modo responsabile di prendersi cura di sé.
        Un confronto professionale può aiutare a chiarire cosa sta succedendo,
        distinguendo ciò che è transitorio da ciò che va approfondito.
      </p>
      <p>
        Un percorso di counseling integrato può offrire uno spazio di ascolto e orientamento,
        in dialogo – se serve – con altri professionisti della salute.
        L’obiettivo non è dare risposte affrettate,
        ma aiutarti a fare il prossimo passo con più chiarezza e sicurezza.
      </p>
      <p>
        Se senti che parlarne potrebbe esserti utile,
        puoi valutare una breve chiamata di orientamento,
        con me o con un professionista di tua fiducia.
      </p>
    `;
  } else if (flags.fanno_male) {
    message = `
      <p><strong>Accorgerti di ciò che non ti sostiene più.</strong></p>
      <p>
        Questa consapevolezza è già un primo passo importante.
        Non sempre serve cambiare tutto subito:
        a volte basta iniziare a osservare con più attenzione
        ciò che toglie energia e ciò che la restituisce.
      </p>
      <p>
        Un percorso di counseling integrato può aiutare a dare senso a questi segnali,
        lavorando su relazioni, scelte quotidiane e modo di stare nelle situazioni,
        in modo concreto e rispettoso dei tuoi tempi.
      </p>
      <p>
        Se lo desideri, puoi usare questo momento per orientarti:
        con me o con un altro professionista,
        scegliendo il tipo di supporto che senti più adatto ora.
      </p>
    `;
  } else if (flags.supporto_diverso || flags.ascoltare) {
    message = `
      <p><strong>Dare spazio a ciò che senti.</strong></p>
      <p>
        Quando emergono sensazioni diffuse o difficili da nominare,
        fermarsi ad ascoltare può evitare di andare avanti per inerzia.
        Non significa avere già una risposta,
        ma riconoscere che qualcosa chiede spazio e attenzione.
      </p>
      <p>
        Un counseling integrato può offrire uno spazio di orientamento,
        per mettere ordine tra pensieri, vissuti e bisogni,
        e capire che tipo di supporto è più utile in questa fase della vita.
      </p>
      <p>
        Può essere un primo colloquio,
        una breve chiamata di orientamento,
        oppure il confronto con un professionista che già conosci.
        L’importante è non restare da soli con ciò che emerge.
      </p>
    `;
  } else {
    message = `
      <p><strong>Anche una pausa può diventare una svolta.</strong></p>
      <p>
        Anche quando non c’è un’urgenza evidente, fermarsi può aiutare a guardare meglio come stai,
dove senti più peso e quali passi ti sembrano oggi possibili.
Prendersi questo spazio non serve a decidere subito,
ma a non andare avanti per automatismi.
      </p>
      <p>
        Un percorso di counseling integrato può aiutare a muoverti
        con maggiore consapevolezza tra relazioni, scelte e abitudini,
        senza forzare cambiamenti,
        ma accompagnandoli quando sono maturi.
      </p>
      <p>
        Se senti che è il momento di approfondire,
        puoi scegliere se farlo con me o con un altro professionista:
        l’importante è che il supporto sia coerente con ciò che stai vivendo ora.
      </p>
    `;
  }

  // 2️⃣ INTEGRAZIONE "CONDIZIONI NOTE"
  // solo se NON c'è preoccupazione
  if (flags.condizioni && !flags.preoccupano) {
    message += `
      <hr>
      <p>
        <em>
        Se stai già seguendo percorsi di cura o accompagnamento,
        un counseling integrato non li sostituisce,
        ma può affiancarli,
        offrendo uno spazio per lavorare su relazioni, scelte e abitudini quotidiane,
        in dialogo e nel rispetto di ciò che è già in corso.
        </em>
      </p>
    `;
  }

  resultBox.innerHTML = message;
  resultBox.classList.remove("hidden");
}

  renderStep();
}
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
