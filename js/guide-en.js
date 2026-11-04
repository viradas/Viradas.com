/* === QUIZ VIRADAS — English === */

console.log("Quiz file loaded:", location.pathname);

function initQuiz() {
  const steps = [
    {
      id: 1,
      multi: false,
      question: "What feeling has been accompanying you lately?",
      options: [
        { tag: "relazione", text: "I feel constrained, as though I have no time or space to be or do what I would like." },
        { tag: "strumenti", text: "I do not feel as capable as I would like; something seems to be missing or holding me back." },
        { tag: "corpo", text: "I feel under constant pressure, as though I always have to hold something together." },
        { tag: "vuoto", text: "I lack momentum, as though I have lost interest." }
      ]
    },
    {
      id: 2,
      multi: false,
      question: "What do you think might help or ease things a little at this time?",
      options: [
        { tag: "relazione", text: "See things differently and understand what I really want and what is good for me." },
        { tag: "strumenti", text: "Know how to take steps to change my current situation." },
        { tag: "corpo", text: "Regain energy and vitality; I feel exhausted." },
        { tag: "vuoto", text: "Feel a sense of purpose or desire for something again." }
      ]
    },
    {
      id: 3,
      multi: true,
      question: "Where do you notice this difficulty the most?",
      options: [
        { tag: "relazione", text: "With people: I adapt, struggle to say no and do not feel seen." },
        { tag: "strumenti", text: "In decisions: I put things off, cannot move forward and feel stuck." },
        { tag: "corpo", text: "In my body: constant tension, a feeling of heaviness or tiredness that rest does not relieve." },
        { tag: "orientamento", text: "In my thoughts: my mind is always racing (ruminating), or it feels blank and I struggle to concentrate." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "What do you make of these signs today?",
      options: [
        { tag: "corpo", text: "I mainly associate them with stress or a difficult period." },
        { tag: "orientamento_cond", text: "I know what is behind them and am trying to manage them, although it is not always easy." },
        { tag: "ascoltare", text: "I feel they are important signs that deserve careful attention." },
        { tag: "umore_clinico", text: "This feeling of emptiness or deep exhaustion worries me." },
        { tag: "fanno_male", text: "I notice that some habits or reactions are no longer good for me." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "What do you feel able to do now, without adding more pressure?",
      options: [
        { tag: "riflessione", text: "Pause and make sense of what I am experiencing." },
        { tag: "azione", text: "Try doing something differently, even in a small, practical way." },
        { tag: "corpo", text: "Bring some order back to my daily habits." },
        { tag: "supporto", text: "Consider whether these signs also warrant medical or psychological attention." }
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
    const hintText = step.multi ? "You can choose more than one answer." : "Choose one answer.";
    if (stepLabel) stepLabel.textContent = `QUESTION ${currentStep + 1} OF ${steps.length}`;
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
        <p class="hint-error hidden">Choose at least one answer to continue.</p>
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
    if (stepLabel) stepLabel.textContent = "YOUR GUIDANCE";
    if (progressFill) progressFill.style.width = "100%";

    const allTags = Object.values(answers).flat();
    
    let title = "";
    let message = "";

    // LOGICA DI ASSEGNAZIONE BASATA SUI TAG DELLE RISPOSTE
    // Profilo 1: Vuoto o Umore clinico
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
        title = "Regain your breath and a sense of footing";
        message = `
            <p>If you feel a lack of drive lately and tiredness seems to spread into everything, you may also sense an underlying pressure. Sometimes it feels like being trapped in a cloud of sadness or heaviness that stops you from taking any initiative. This can happen when you remain too long in a constraining situation that gradually takes away your breath and motivation.</p>
            <p>At times like these, even simple things can feel enormously difficult, and your resources may seem almost depleted. You may feel deeply frustrated because you want to change something but feel you have neither the space nor the strength to do so.</p> 
            <p>This is an important sign: your system is telling you that before taking action, you need to regain some footing.</p>
            <p><strong>Something helpful (1 minute):</strong>
            Instead of asking yourself “what should I do?”, try pausing and asking: <em>“Right now, do I need a small movement to ease this heaviness, or do I need to rest and recover my energy?”</em></p>
            <p><strong>One more thought:</strong> If this loss of energy feels very deep, or if sadness has been with you for a long time, it may be valuable to speak with your doctor or a psychotherapist. Seeking clinical support during particularly dark periods is an important way of caring for yourself. Such support can go alongside other approaches, including counselling, when you feel ready to reconnect with your plans and aspirations.</p>
        `;
    } 
    // Profilo 2: Pressione continua o Corpo
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
        title = "Ease the alertness and the load";
        message = `
            <p>What emerges here is overload: whether it shows up as tension in your body or thoughts that will not stop, the signal is similar. Your system is on alert and asking you to slow down because it has reached a limit.</p>
            <p><strong>A useful rule of thumb:</strong> it is better to remove one small pressure than add one big goal.</p>
            <p><strong>Something helpful (2 minutes):</strong>
            Choose a moment of the day when you feel the most pressure and ask yourself: “What small action, thought or situation increases it?” and “What reduces it?”<br>
            Then make just one choice: reduce what increases it by 10% (even if only for today).</p>
            <p><strong>A practical clue:</strong> If your body is constantly on alert, pushing harder will not help. What may help is a short, manageable recovery routine without any expectation of perfection.</p>
        `;
    } 
    // Profilo 3: Default (Relationship/Spazio)
    else {
        title = "Regain space and room to act";
        message = `
            <p>If you feel caught in a situation that is closing in on you, the issue is usually not a lack of willpower but a lack of space. When you feel you have no room to manoeuvre, whether in a relationship, a role or a commitment, the first thing you lose is the ability to see where you can still move.</p>
            <p><strong>The aim:</strong> Before deciding what to change, it helps to understand precisely where and how you are losing your space.</p>
            <p><strong>The exercise (90 seconds):</strong>
            Think of a recent situation in which you felt you had little room to act. Look at it for a moment: is the pressure coming from outside (a request, an obligation, a person) or from within (thoughts, expectations, guilt)?<br><br>
            Now ask yourself: “At that moment, what was I trying to protect or keep safe?” (my peace of mind, my self-image, my time, control, other people’s approval...).</p>
            <p><strong>A small point of guidance:</strong> When you understand what you are protecting and at what cost, the direction becomes clearer: not as a drastic decision, but as a possible step towards reclaiming some ground.</p>
            <p><em>Please note: if your freedom to act is restricted by controlling circumstances or real danger, it is essential not to face everything alone. Seeking appropriate specialist support is a first step towards protecting your safety.</em></p>
        `;
    }

    resultBox.innerHTML = `<h3>${title}</h3>${message} <p class="micro-note"><em>This quiz is a tool for guidance and reflection. It does not provide diagnoses or replace medical or psychotherapeutic assessment or care.</em></p>`;
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


console.log("guide-en.js LOADED");


window.VIRADAS_STEP_CONTENT = {
  verita: {
    title: "Truth",
    text: "Gain clarity about what is happening, distinguishing facts, emotions and interpretations."
  },
  identita: {
    title: "Identity",
    text: "Reconnect with your values, needs and desires, distinguishing them from what no longer belongs to you."
  },
  relazione: {
    title: "Relationship",
    text: "Recognize roles, expectations and recurring patterns in your relationship with yourself and others."
  },
  assertivita: {
    title: "Assertiveness",
    text: "Practise expressing needs and boundaries with clarity and gentle firmness, without aggression or giving up on yourself."
  },
  direzione: {
    title: "Direction",
    text: "Choose a direction and turn a wish into a plan, one step at a time."
  },
  azione: {
    title: "Action",
    text: "Try small steps to create more room and open up new possibilities."
  },
  svolta: {
    title: "Turning point",
    text: "Integrate and consolidate changes, allowing a turning point that transforms without overwhelming."
  }
};
