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
    const hintText = step.multi ? "<b>PIÙ</b> risposte possibili." : "<b>UNA</b> sola risposta.";

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
      };
    });
    prevBtn.disabled = currentStep === 0;
  }

  function showResult() {
    container.innerHTML = "";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    const allTags = Object.values(answers).flat();
    
    let title = "";
    let message = "";

    // LOGICA DI ASSEGNAZIONE BASATA SUI TAG DELLE RISPOSTE
    // Profilo 1: Vuoto o Umore clinico
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
        title = "Recuperare respiro e terreno";
        message = `
            <p>Se in questo periodo senti che la spinta manca e una stanchezza invade un po’ tutto, è probabile che tu senta anche una pressione di fondo. A volte ci si sente come intrappolati in una nuvola di tristezza o di pesantezza che blocca ogni iniziativa: succede quando si rimane troppo a lungo in una situazione stretta che finisce per togliere respiro e voglia di fare.</p>
            <p>In questi momenti le cose semplici sembrano pesantissime e le tue risorse appaiono ridotte ai minimi termini. Potresti sentire una forte frustrazione perché vorresti cambiare qualcosa, ma ti sembra di non avere né lo spazio né la forza per farlo.</p> 
            <p>È un segnale importante: il tuo sistema ti sta dicendo che prima di agire bisogna recuperare terreno.</p>
            <p><strong>Una cosa utile (1 minuto):</strong>
            Invece di chiederti “cosa dovrei fare?”, prova a fermarti e chiederti: <em>“In questo momento ho più bisogno di un piccolo movimento per sciogliere questa pesantezza o di stare ferma/o per recuperare energia?”</em></p>
            <p><strong>Un pensiero in più:</strong> Se senti che questo spegnimento è molto profondo o se questa tristezza ti accompagna da tanto tempo, potrebbe essere prezioso parlarne con il tuo medico o con uno psicoterapeuta. Avere un sostegno clinico nei momenti di buio più intenso è un atto di grande rispetto verso te stessa/o, che può viaggiare insieme ad altri percorsi come il counseling quando sentirai il bisogno di rimettere mano alla tua progettualità.</p>
        `;
    } 
    // Profilo 2: Pressione continua o Corpo
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
        title = "Allentare l’allerta e il carico";
        message = `
            <p>Qui emerge un sovraccarico: che si manifesti come tensione nel corpo o come pensieri che non si fermano, il segnale è lo stesso. Il tuo sistema è “in guardia” e ti sta chiedendo di rallentare perché ha raggiunto un limite.</p>
            <p><strong>Regola d’oro in questi casi:</strong> meglio togliere una piccola pressione che aggiungere un grande obiettivo.</p>
            <p><strong>Una cosa utile (2 minuti):</strong>
            Scegli un momento della giornata in cui senti più pressione e chiediti: “Quale piccola azione, pensiero o scenario la aumenta?” e “Quale la riduce?”<br>
            Poi fai solo una scelta: riduci del 10% ciò che la aumenta (anche solo per oggi).</p>
            <p><strong>Indizio pratico:</strong> Se il corpo è sempre “in guardia”, non serve spingere di più: serve creare una piccola routine di recupero che sia breve, fattibile e senza pretese di perfezione.</p>
        `;
    } 
    // Profilo 3: Default (Relazione/Spazio)
    else {
        title = "Ritrovare spazio e raggio d’azione";
        message = `
            <p>Se ti senti in una situazione che "stringe", di solito non è un problema di mancanza di volontà, ma di mancanza di spazio. Quando senti di non avere margine di manovra, che sia in una relazione, in un ruolo o in un impegno, la prima cosa che perdi è la capacità di vedere dove puoi davvero muoverti.</p>
            <p><strong>L'obiettivo:</strong> Prima di decidere cosa cambiare, serve capire con precisione dove e come stai perdendo il tuo spazio.</p>
            <p><strong>L'esercizio (90 secondi):</strong>
            Pensa a una situazione recente in cui hai sentito poco raggio d'azione. Prova a guardarla per un istante: è una pressione che arriva da fuori (una richiesta, un obbligo, una persona) o da dentro (pensieri, aspettative, senso di colpa)?<br><br>
            Ora chiediti: “In quel momento, che cosa stavo cercando di proteggere o tenere al sicuro?” (la mia pace, un'immagine di me, il mio tempo, il controllo, l'approvazione degli altri...).</p>
            <p><strong>Piccolo orientamento:</strong> Se capisci cosa stai proteggendo e a quale costo lo stai facendo, la direzione appare più chiara: non come una scelta drastica, ma come un passo possibile per riprenderti un po' di terreno.</p>
            <p><em>Nota bene: se senti che il tuo margine di manovra è bloccato da situazioni di controllo o pericolo reale, è fondamentale non affrontare tutto in solitudine: cercare un supporto specifico è il primo atto di protezione per la propria incolumità.</em></p>
        `;
    }

    resultBox.innerHTML = `<h3>${title}</h3>${message} <p class="micro-note"><em>Questo quiz è uno strumento di orientamento e riflessione. Non fornisce diagnosi né sostituisce valutazioni o percorsi medici o psicoterapeutici.</em></p>`;
    resultBox.classList.remove("hidden");
  }

  nextBtn.onclick = () => {
    if (!answers[steps[currentStep].id]) {
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

