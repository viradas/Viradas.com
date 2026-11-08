/* === QUIZ VIRADAS — English === */


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

  // PUNTEGGIO PER PROFILO
  // Ogni risposta pesa su uno dei tre profili: [profilo, peso]
  //   1 = energie che vengono meno · 2 = pressione e tensione · 3 = poco spazio per sé
  // Il tag da solo non basta: conta anche in quale domanda è stato scelto.
  function scoreProfile() {
    const WEIGHTS = {
      1: { relazione: [3, 2], strumenti: [3, 2], corpo: [2, 2], vuoto: [1, 2] },
      2: { relazione: [3, 2], strumenti: [3, 2], corpo: [1, 2], vuoto: [1, 2] },
      3: { relazione: [3, 1], strumenti: [3, 1], corpo: [2, 1], orientamento: [2, 1] },
      4: { corpo: [2, 1], fanno_male: [2, 1], umore_clinico: [1, 3] },
      5: { corpo: [2, 1], riflessione: [3, 1] }
    };
    const score = { 1: 0, 2: 0, 3: 0 };
    Object.keys(answers).forEach(q => {
      (answers[q] || []).forEach(tag => {
        const w = (WEIGHTS[q] || {})[tag];
        if (w) score[w[0]] += w[1];
      });
    });
    const max = Math.max(score[1], score[2], score[3]);
    // a parità vince il profilo 3, poi il 2, poi il 1
    return [3, 2, 1].find(p => score[p] === max);
  }

  function showResult() {
    container.innerHTML = "";
    nextBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    if (stepLabel) stepLabel.textContent = "YOUR GUIDANCE";
    if (progressFill) progressFill.style.width = "100%";

    const allTags = Object.values(answers).flat();
    const profile = scoreProfile();
    const needsHealthNote = profile === 1 || allTags.includes("umore_clinico") || allTags.includes("supporto");
    
    let title = "";
    let message = "";

    
    // PROFILE ASSIGNMENT LOGIC BASED ON ANSWER TAGS

    // Profile 1: Fatigue, emptiness, lack of energy
    if (profile === 1) {
        title = "When your energy is running low";
        message = `
            <p>There are times when even the simplest things seem to require an enormous amount of effort. You wish something would change, but you feel you don't have the energy to begin. Tiredness, sadness or a sense of emptiness can make it difficult to see a way forward.</p>

            <p>Perhaps what you're going through is asking you to pause and acknowledge how tired you feel, rather than keep expecting more of yourself.</p>

            <p><strong>A first moment of awareness:</strong> the first step isn't always about doing more. Sometimes it's about recognising what's draining our energy and making room for our own needs.</p>

            <p><strong>A small exercise (1 minute):</strong> instead of asking yourself "What should I do?", try pausing and asking: <em>"Right now, do I need to take a small step to ease this heaviness, or do I need to stop and regain some energy?"</em></p>

            <p><strong>And from here?</strong> If you'd like to take another step, we can explore together what's weighing on you and look for new possibilities to help you find some breathing room, at your own pace.</p>

            <p><em>If feelings of sadness, emptiness or low energy are intense or persistent, it's important to speak with a doctor or psychotherapist to receive appropriate support.</em></p>
        `;
    }

    // Profile 2: Ongoing pressure, tension and overload
    else if (profile === 2) {
        title = "When the pressure never lets up";
        message = `
            <p>Perhaps you feel you always have to be present, available and ready to respond to whatever happens. Your thoughts keep racing, your body remains tense and even when you could rest, it's not easy to let go.</p>

            <p>When we get used to carrying so much, it can become difficult to notice just how much space this pressure takes up in our lives.</p>

            <p><strong>A first moment of awareness:</strong> perhaps it's not about learning to cope with even more, but about recognising how much you're carrying and how much room is left for you.</p>

            <p><strong>A small exercise (2 minutes):</strong> think of a moment in your day when you feel particularly under pressure. Ask yourself: <em>"What makes it worse? And what, even just for a moment, makes it feel lighter?"</em></p>

            <p><strong>And from here?</strong> If you'd like to take another step, we can explore together what's contributing to this pressure and where it might be possible to start easing it.</p>
        `;
    }

    // Profile 3: Relationships, expectations and personal space
    else {
        title = "When there's little room for yourself";
        message = `
            <p>Sometimes we find ourselves in situations where it feels as though we have very little room to choose. This can happen in relationships, at work, in everyday responsibilities or in the expectations we place on ourselves.</p>

            <p>We get used to adapting, meeting demands and doing what seems necessary, until we gradually lose sight of what we truly want.</p>

            <p><strong>A first moment of awareness:</strong> noticing where you feel constrained can help you recognise how much room you leave for your own needs and choices.</p>

            <p><strong>A small exercise (90 seconds):</strong> think of a recent situation in which you felt you had very little room to choose. Try asking yourself: <em>"Was the pressure mainly coming from outside, from other people's demands or expectations, or from within, from what I expected of myself?"</em></p>

            <p><strong>And from here?</strong> If you'd like to take another step, we can explore together what's limiting your space today and what possibilities might open up for you to choose your own direction more freely.</p>
        `;
    }


    // Note finali: sicurezza sempre presente; nota medica se serve (il profilo 1 ha già la sua)
    const extraNotes = (needsHealthNote && profile !== 1 ? `<p><em>If tiredness, a sense of emptiness or other signs concern you, it's important to speak with a doctor or psychotherapist to receive appropriate support.</em></p>` : "") + `<p><em>If you are experiencing control, threats or danger, or if your distress is intense, please contact <a href="https://www4.ti.ch/tich/numeri-di-emergenza" target="_blank" rel="noopener">specialised services</a> straight away.</em></p>`;

    resultBox.innerHTML = `<h3>${title}</h3>${message}${extraNotes} <p class="micro-note"><em>This quiz is a tool for guidance and reflection. It does not provide diagnoses or replace medical or psychotherapeutic assessment or care.</em></p>`;
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
