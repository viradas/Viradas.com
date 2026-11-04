/* === QUIZ PERCORSI AGGIORNATO (Versione Consapevolezza e Slancio) === */

console.log("QUIZ file caricato:", location.pathname);

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
        { tag: "strumenti", text: "Sapere come muovermi per cambiare la situazione attuale, passo per passo." },
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
        { tag: "corpo", text: "Nel corpo: tensione costante, sensazione di peso oppure stanchezza che non passa col riposo." },
        { tag: "orientamento", text: "Nei pensieri: la testa è sempre accesa (rimuginio) oppure la sento vuota e fatico a concentrarmi." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "Cosa pensi di questi segnali oggi?",
      options: [
        { tag: "corpo", text: "Li collego soprattutto allo stress o ad un periodo difficile." },
        { tag: "orientamento_cond", text: "So che cosa c'è dietro e sto cercando di gestirli, anche se non è sempre semplice." },
        { tag: "ascoltare", text: "Sento che sono segnali importanti che vanno ascoltati con cura." },
        { tag: "umore_clinico", text: "Mi preoccupa questo senso di vuoto o di stanchezza profonda." },
        { tag: "fanno_male", text: "Mi accorgo che alcune abitudini o reazioni non mi fanno più bene." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "Cosa senti di poter fare ora, senza aggiungere altra pressione?",
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
  const stepLabel = document.getElementById("quiz-step-label");
  const progressFill = document.getElementById("quiz-progress-fill");


console.log("QUIZ init:", {
  container,
  prevBtn,
  nextBtn,
  restartBtn,
  resultBox
});

  if (!container || !prevBtn || !nextBtn || !restartBtn || !resultBox) return;

  function renderStep() {
    const step = steps[currentStep];
    const hintText = step.multi ? "Puoi scegliere più risposte." : "Scegli una sola risposta.";
    if (stepLabel) stepLabel.textContent = `DOMANDA ${currentStep + 1} DI ${steps.length}`;
    if (progressFill) progressFill.style.width = `${(currentStep + 1) / steps.length * 100}%`;

    container.innerHTML = `
      <div class="question" data-multi="${step.multi}">
        <h3>${step.question}</h3>
        <p class="question-hint">${hintText}</p>
        <div class="options">
          ${step.options.map(o => `
            <button type="button" class="option-card ${(answers[step.id] || []).includes(o.tag) ? "selected" : ""}" data-tag="${o.tag}" aria-pressed="${(answers[step.id] || []).includes(o.tag)}">
              <span>${o.text}</span>
            </button>
          `).join("")}
        </div>
        <p class="hint-error hidden">Scegli almeno una risposta per continuare.</p>
      </div>
    `;

    container.querySelectorAll(".option-card").forEach(card => {
      card.onclick = () => {
        const tag = card.dataset.tag;
        if (step.multi) {
          const selected = answers[step.id] || [];
          answers[step.id] = selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag];
        } else {
          answers[step.id] = [tag];
        }
        renderStep();
        const updated = [...container.querySelectorAll(".option-card")].find(button => button.dataset.tag === tag);
        if (updated) updated.focus({ preventScroll: true });
      };
    });
    prevBtn.disabled = currentStep === 0;
  }

  function showResult() {
    container.innerHTML = "";
    nextBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    if (stepLabel) stepLabel.textContent = "IL TUO ORIENTAMENTO";
    if (progressFill) progressFill.style.width = "100%";

    const allTags = Object.values(answers).flat();
    
    let title = "";
    let message = "";

   
   
    // LOGICA DI ASSEGNAZIONE BASATA SUI TAG DELLE RISPOSTE

    // Profilo 1: Fatica, vuoto, mancanza di energia
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
        title = "Quando le energie vengono meno";
        message = `
            <p>Ci sono momenti in cui anche le cose più semplici sembrano richiedere uno sforzo enorme. Vorresti che qualcosa cambiasse, ma senti di non avere l'energia per iniziare. La stanchezza, la tristezza o una sensazione di vuoto possono rendere difficile vedere una via d'uscita.</p>

            <p>Forse ciò che stai vivendo ti sta chiedendo di fermarti e ascoltare la tua fatica, invece di pretendere ancora qualcosa da te.</p>

            <p><strong>Una prima consapevolezza:</strong> non sempre il primo passo è fare di più. A volte è riconoscere ciò che ci sta togliendo energia e dare spazio ai propri bisogni.</p>

            <p><strong>Un piccolo esercizio (1 minuto):</strong> invece di chiederti "Cosa dovrei fare?", prova a fermarti e domandarti: <em>"In questo momento ho più bisogno di un piccolo movimento per alleggerire questa pesantezza o di fermarmi per recuperare energia?"</em></p>

            <p><strong>E da qui?</strong> Se desideri fare un passo in più, possiamo esplorare insieme ciò che ti pesa e cercare nuove possibilità per ritrovare un po' di respiro, rispettando i tuoi tempi.</p>

            <p><em>Se la tristezza, il vuoto o la mancanza di energia sono intensi o persistenti, è importante parlarne con un medico o uno psicoterapeuta per ricevere un sostegno adeguato.</em></p>
        `;
    }

    // Profilo 2: Pressione continua, tensione e sovraccarico
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
        title = "Quando la pressione non si ferma";
        message = `
            <p>Forse hai la sensazione di dover essere sempre presente, disponibile, pronta/o a rispondere a ciò che accade. I pensieri non si fermano, il corpo resta in tensione e anche quando potresti riposare, non è semplice lasciar andare.</p>

            <p>Quando ci si abitua a sostenere tanto, può diventare difficile accorgersi di quanto spazio occupi questa pressione nella propria vita.</p>

            <p><strong>Una prima consapevolezza:</strong> forse non si tratta di imparare a sopportare di più, ma di riconoscere quanto stai sostenendo e quanto spazio rimane per te.</p>

            <p><strong>Un piccolo esercizio (2 minuti):</strong> pensa a un momento della giornata in cui senti particolarmente la pressione. Chiediti: <em>"Che cosa la aumenta? E che cosa, anche solo per un momento, la rende più leggera?"</em></p>

            <p><strong>E da qui?</strong> Se desideri fare un passo in più, possiamo esplorare insieme ciò che alimenta questa pressione e dove potrebbe essere possibile iniziare ad allentarla.</p>
        `;
    }

    // Profilo 3: Relazioni, aspettative e spazio personale
    else {
        title = "Quando manca spazio per sé";
        message = `
            <p>A volte ci si ritrova in situazioni in cui sembra di avere poco margine di scelta. Può succedere nelle relazioni, nel lavoro, nelle responsabilità quotidiane o nelle aspettative che abbiamo verso noi stessi.</p>

            <p>Ci si abitua ad adattarsi, a rispondere alle richieste e a fare ciò che sembra necessario, fino a perdere un po' di vista ciò che si desidera davvero.</p>

            <p><strong>Una prima consapevolezza:</strong> accorgerti di dove ti senti stretta/o può aiutarti a riconoscere quanto spazio lasci ai tuoi bisogni e alle tue scelte.</p>

            <p><strong>Un piccolo esercizio (90 secondi):</strong> pensa a una situazione recente in cui ti sei sentita/o senza molto spazio di scelta. Prova a chiederti: <em>"La pressione arrivava soprattutto da fuori, dalle richieste o dalle aspettative degli altri, oppure da dentro, da ciò che pretendevo da me?"</em></p>

            <p><strong>E da qui?</strong> Se desideri fare un passo in più, possiamo esplorare insieme ciò che oggi limita il tuo spazio e quali possibilità potrebbero aprirsi per scegliere con maggiore libertà la tua direzione.</p>

            <p><em>Se vivi situazioni di controllo, minaccia o pericolo, è importante cercare un sostegno specifico per proteggere la tua sicurezza.</em></p>
        `;
    }

    resultBox.innerHTML = `<h3>${title}</h3>${message} <p class="micro-note"><em>Questo quiz è uno strumento di orientamento e riflessione. Non fornisce diagnosi né sostituisce valutazioni o percorsi medici o psicoterapeutici.</em></p>`;
    resultBox.classList.remove("hidden");
  }

  nextBtn.onclick = () => {
    if (!answers[steps[currentStep].id]?.length) {
      container.querySelector(".hint-error").classList.remove("hidden");
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

  restartBtn.onclick = () => location.reload();

  renderStep();
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz);
} else {
  initQuiz();
}


console.log("guide-it.js LOADED");


window.VIRADAS_STEP_CONTENT = {
  verita: {
    title: "Verità",
    text: "Fare chiarezza su ciò che sta accadendo, distinguendo tra fatti, emozioni e interpretazioni."
  },
  identita: {
    title: "Identità",
    text: "Riappropriarsi dei propri valori, bisogni e desideri, distinguendoli da ciò che non ci appartiene più."
  },
  relazione: {
    title: "Relazione",
    text: "Riconoscere ruoli, aspettative e schemi ricorrenti nella relazione con sé e con gli altri."
  },
  assertivita: {
    title: "Assertività",
    text: "Allenarsi ad esprimere bisogni e confini, con chiarezza e gentile fermezza, senza aggredire, né rinunciare."
  },
  direzione: {
    title: "Direzione",
    text: "Scegliere una direzione e trasformare il desiderio in progetto, passo dopo passo."
  },
  azione: {
    title: "Azione",
    text: "Sperimentare piccoli passi per allargare lo spazio e creare nuove possibilità."
  },
  svolta: {
    title: "Svolta",
    text: "Integrare e consolidare i cambiamenti, in una svolta che non stravolge, ma trasforma."
  }
};
