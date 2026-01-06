/* === UPDATED QUIZ PATHS (Awareness & Momentum Version) === */

console.log("QUIZ file loaded:", location.pathname);

function initQuiz() {
  const steps = [
    {
      id: 1,
      multi: false,
      question: "What sensation has been accompanying you lately?",
      options: [
        { tag: "relazione", text: "I feel constrained, as if I had no space or time to be or do what I would like." },
        { tag: "strumenti", text: "I don’t feel as capable as I’d like to be; something seems to be missing or holding me back." },
        { tag: "corpo", text: "I live under constant pressure, as if I always had to hold something together." },
        { tag: "vuoto", text: "I feel a lack of momentum, as if I had lost interest." }
      ]
    },
    {
      id: 2,
      multi: false,
      question: "What do you think could help or lighten things a bit right now?",
      options: [
        { tag: "relazione", text: "Changing my perspective and understanding what I truly want and what is good for me." },
        { tag: "strumenti", text: "Knowing how to move forward to change my current situation, step by step." },
        { tag: "corpo", text: "Regaining energy and vitality; I feel very tired." },
        { tag: "vuoto", text: "Feeling a sense of purpose or desire again." }
      ]
    },
    {
      id: 3,
      multi: true,
      question: "Where does this difficulty show up the most?",
      options: [
        { tag: "relazione", text: "In relationships: I adapt, I don’t say no, I don’t feel seen." },
        { tag: "strumenti", text: "In decisions: I postpone, I don’t move, I feel stuck." },
        { tag: "corpo", text: "In my body: constant tension, a sense of heaviness, or fatigue that doesn’t go away with rest." },
        { tag: "orientamento", text: "In my thoughts: my mind is always on (rumination), or it feels empty and I struggle to concentrate." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "How do you see these signals today?",
      options: [
        { tag: "corpo", text: "I mainly relate them to stress or a difficult period." },
        { tag: "orientamento_cond", text: "I know what’s behind them and I’m trying to manage them, even if it’s not easy." },
        { tag: "ascoltare", text: "I feel they are important signals that deserve careful listening." },
        { tag: "umore_clinico", text: "This sense of emptiness or deep fatigue worries me." },
        { tag: "fanno_male", text: "I notice that some habits or reactions are no longer good for me." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "What do you feel you can do now, without adding more pressure?",
      options: [
        { tag: "riflessione", text: "Pause and make sense of what I’m experiencing." },
        { tag: "azione", text: "Try to do something different, even in a small and concrete way." },
        { tag: "corpo", text: "Bring more order into my daily habits and routines." },
        { tag: "supporto", text: "Consider whether these signals also deserve a medical or psychological perspective." }
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
    const hintText = step.multi ? "<b>MULTIPLE</b> answers possible." : "<b>ONE</b> answer only.";

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
        <p class="hint-error hidden">Please choose at least one answer to continue.</p>
      </div>
    `;

    container.querySelectorAll(".option-card").forEach(card => {
      card.onclick = () => {
        const tag = card.dataset.tag;
        if (step.multi) {
          const selected = answers[step.id] || [];
          answers[step.id] = selected.includes(tag)
            ? selected.filter(t => t !== tag)
            : [...selected, tag];
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

    // Profile 1: Emptiness or clinical mood
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
      title = "Regaining breath and ground";
      message = `
        <p>If lately you feel that momentum is missing and fatigue seems to spread everywhere, it’s likely that you’re also carrying an underlying pressure. Sometimes it feels like being trapped in a cloud of sadness or heaviness that blocks any initiative — this often happens when we stay too long in a constraining situation that slowly takes away our breath and motivation.</p>
        <p>In these moments, even simple things can feel overwhelming, and your resources may seem reduced to a minimum. You might feel deep frustration: wanting to change something, yet feeling you have neither the space nor the strength to do so.</p>
        <p>This is an important signal: your system is telling you that before acting, you need to regain some ground.</p>
        <p><strong>One helpful thing (1 minute):</strong>
        Instead of asking “What should I do?”, pause and ask yourself:
        <em>“Right now, do I need a small movement to loosen this heaviness, or do I need stillness to recover energy?”</em></p>
        <p><strong>An additional thought:</strong>
        If this sense of shutdown feels very deep or has been with you for a long time, it may be valuable to talk with your doctor or a psychotherapist. Seeking clinical support during darker moments is a profound act of self-respect, and it can coexist with other paths, such as counseling, when you feel ready to reconnect with your sense of direction and possibility.</p>
      `;
    }
    // Profile 2: Continuous pressure / Body
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
      title = "Easing alertness and load";
      message = `
        <p>Here, overload emerges: whether it shows up as bodily tension or as thoughts that won’t stop, the signal is the same. Your system is “on alert” and is asking you to slow down, because a limit has been reached.</p>
        <p><strong>Golden rule in these cases:</strong> it’s better to remove a small pressure than to add a big goal.</p>
        <p><strong>One helpful thing (2 minutes):</strong>
        Choose a moment of the day when pressure feels strongest and ask yourself:
        “Which small action, thought, or situation increases this pressure?” and
        “Which one reduces it?”<br>
        Then make just one choice: reduce by 10% whatever increases it (even just for today).</p>
        <p><strong>Practical hint:</strong>
        If your body is constantly “on guard,” pushing harder won’t help. What’s needed is a small recovery routine — short, doable, and free from perfectionism.</p>
      `;
    }
    // Profile 3: Space / Agency
    else {
      title = "Regaining space and room for action";
      message = `
        <p>When you feel in a situation that feels “tight,” it’s usually not a lack of willpower, but a lack of space. When there’s no room to maneuver — in a relationship, a role, or a commitment — the first thing you lose is the ability to see where you can still move.</p>
        <p><strong>The goal:</strong>
        Before deciding what to change, it’s essential to clearly understand where and how you are losing your space.</p>
        <p><strong>The exercise (90 seconds):</strong>
        Think of a recent situation in which you felt little room for action. Observe it briefly:
        was the pressure coming from outside (a request, an obligation, a person) or from inside (thoughts, expectations, guilt)?<br><br>
        Then ask yourself:
        “In that moment, what was I trying to protect or keep safe?”
        (my peace, an image of myself, my time, control, others’ approval...)</p>
        <p><strong>Small orientation:</strong>
        When you understand what you are protecting — and at what cost — the direction becomes clearer: not as a drastic choice, but as a possible step toward regaining some ground.</p>
        <p><em>Important note: if you feel your room for action is blocked by real situations of control or danger, it is essential not to face this alone. Seeking specific support is the first act of protection for your own safety.</em></p>
      `;
    }

    resultBox.innerHTML = `
      <h3>${title}</h3>
      ${message}
      <p class="micro-note"><em>This quiz is a tool for reflection and orientation. It does not provide diagnoses and does not replace medical or psychotherapeutic evaluations or treatments.</em></p>
    `;
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


window.VIRADAS_STEP_CONTENT = {
  verita: {
    title: "Truth",
    text: "Recognizing what is truly happening, without judgment and without avoidance."
  },
  identita: {
    title: "Identity",
    text: "Seeing who you are today, what you feel, what you desire, what nourishes you and what holds you back."
  },
  relazione: {
    title: "Relationship",
    text: "Exploring how you relate to others: boundaries, needs, and recurring patterns."
  },
  assertivita: {
    title: "Assertiveness",
    text: "Developing the ability to say yes or no, to ask, negotiate, and communicate clearly."
  },
  direzione: {
    title: "Direction",
    text: "Understanding where you truly want to go and what gives meaning to your path."
  },
  azione: {
    title: "Action",
    text: "Turning desires and needs into concrete, realistic steps that respect your timing."
  },
  svolta: {
    title: "Turning Point",
    text: "Integrating what you have discovered and grounding change in everyday life."
  }
};
