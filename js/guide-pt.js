/* === QUIZ VIRADAS — Português brasileiro === */

console.log("Arquivo do quiz carregado:", location.pathname);

function initQuiz() {
  const steps = [
    {
      id: 1,
      multi: false,
      question: "Que sensação tem acompanhado você neste período?",
      options: [
        { tag: "relazione", text: "Sinto que me falta espaço, como se não tivesse tempo nem espaço para ser ou fazer o que gostaria." },
        { tag: "strumenti", text: "Não me sinto tão capaz quanto gostaria; parece que algo me falta ou me impede de avançar." },
        { tag: "corpo", text: "Vivo sob pressão constante, como se tivesse sempre que sustentar alguma coisa." },
        { tag: "vuoto", text: "Sinto falta de ânimo, como se tivesse perdido o interesse." }
      ]
    },
    {
      id: 2,
      multi: false,
      question: "O que você acha que poderia ajudar ou aliviar um pouco este momento?",
      options: [
        { tag: "relazione", text: "Olhar de outra forma e entender o que realmente quero e o que me faz bem." },
        { tag: "strumenti", text: "Saber como agir para mudar a situação atual, passo a passo." },
        { tag: "corpo", text: "Recuperar energia e vitalidade; sinto muito cansaço." },
        { tag: "vuoto", text: "Voltar a sentir que tenho um propósito ou desejo por alguma coisa." }
      ]
    },
    {
      id: 3,
      multi: true,
      question: "Onde essa dificuldade se manifesta mais?",
      options: [
        { tag: "relazione", text: "Nas relações: eu me adapto, não consigo dizer não e sinto que não me enxergam." },
        { tag: "strumenti", text: "Nas decisões: adio, não consigo avançar e sinto que estou sem saída." },
        { tag: "corpo", text: "No corpo: tensão constante, sensação de peso ou cansaço que não passa com o descanso." },
        { tag: "orientamento", text: "Nos pensamentos: minha mente não para (fico remoendo as coisas) ou parece vazia, e tenho dificuldade para me concentrar." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "O que você pensa sobre esses sinais hoje?",
      options: [
        { tag: "corpo", text: "Associo esses sinais principalmente ao estresse ou a uma fase difícil." },
        { tag: "orientamento_cond", text: "Sei o que está por trás deles e estou tentando lidar com isso, embora nem sempre seja fácil." },
        { tag: "ascoltare", text: "Sinto que são sinais importantes que merecem atenção e cuidado." },
        { tag: "umore_clinico", text: "Essa sensação de vazio ou de cansaço profundo me preocupa." },
        { tag: "fanno_male", text: "Percebo que alguns hábitos ou reações já não me fazem bem." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "O que você sente que pode fazer agora, sem acrescentar mais pressão?",
      options: [
        { tag: "riflessione", text: "Fazer uma pausa e buscar sentido no que estou vivendo." },
        { tag: "azione", text: "Experimentar fazer algo diferente, mesmo que seja um pequeno passo concreto." },
        { tag: "corpo", text: "Reorganizar meus hábitos cotidianos." },
        { tag: "supporto", text: "Considerar se esses sinais também merecem uma avaliação médica ou psicológica." }
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
    const hintText = step.multi ? "Você pode escolher mais de uma resposta." : "Escolha apenas uma resposta.";
    if (stepLabel) stepLabel.textContent = `PERGUNTA ${currentStep + 1} DE ${steps.length}`;
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
        <p class="hint-error hidden">Escolha pelo menos uma resposta para continuar.</p>
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
    if (stepLabel) stepLabel.textContent = "SUA ORIENTAÇÃO";
    if (progressFill) progressFill.style.width = "100%";

    const allTags = Object.values(answers).flat();
    
    let title = "";
    let message = "";

    
    // LÓGICA DE ATRIBUIÇÃO BASEADA NAS TAGS DAS RESPOSTAS

    // Perfil 1: Cansaço, vazio, falta de energia
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
        title = "Quando a energia começa a faltar";
        message = `
            <p>Há momentos em que até as coisas mais simples parecem exigir um esforço enorme. Você gostaria que algo mudasse, mas sente que não tem energia para começar. O cansaço, a tristeza ou uma sensação de vazio podem dificultar a percepção de uma saída.</p>

            <p>Talvez o que você esteja vivendo seja um convite para parar e acolher seu cansaço, em vez de continuar exigindo mais de si.</p>

            <p><strong>Uma primeira tomada de consciência:</strong> nem sempre o primeiro passo é fazer mais. Às vezes, é reconhecer o que está consumindo nossa energia e dar espaço às nossas necessidades.</p>

            <p><strong>Um pequeno exercício (1 minuto):</strong> em vez de se perguntar "O que eu deveria fazer?", experimente parar e se perguntar: <em>"Neste momento, preciso mais de um pequeno movimento para aliviar esse peso ou de uma pausa para recuperar minhas energias?"</em></p>

            <p><strong>E a partir daqui?</strong> Se você quiser dar mais um passo, podemos explorar juntos o que está pesando e buscar novas possibilidades para recuperar um pouco de fôlego, respeitando seu ritmo.</p>

            <p><em>Se a tristeza, a sensação de vazio ou a falta de energia forem intensas ou persistentes, é importante conversar com um médico ou psicoterapeuta para receber o apoio adequado.</em></p>
        `;
    }

    // Perfil 2: Pressão constante, tensão e sobrecarga
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
        title = "Quando a pressão não dá trégua";
        message = `
            <p>Talvez você sinta que precisa estar sempre presente, disponível e pronto para responder ao que acontece. Os pensamentos não param, o corpo permanece tenso e, mesmo quando você poderia descansar, não é fácil relaxar.</p>

            <p>Quando nos acostumamos a carregar tantas coisas, pode ser difícil perceber quanto espaço essa pressão ocupa em nossa vida.</p>

            <p><strong>Uma primeira tomada de consciência:</strong> talvez não se trate de aprender a suportar mais, mas de reconhecer o quanto você está carregando e quanto espaço ainda resta para você.</p>

            <p><strong>Um pequeno exercício (2 minutos):</strong> pense em um momento do dia em que você sente mais pressão. Pergunte a si: <em>"O que aumenta essa pressão? E o que, mesmo que por um instante, a torna mais leve?"</em></p>

            <p><strong>E a partir daqui?</strong> Se você quiser dar mais um passo, podemos explorar juntos o que alimenta essa pressão e onde seria possível começar a aliviá-la.</p>
        `;
    }

    // Perfil 3: Relações, expectativas e espaço pessoal
    else {
        title = "Quando falta espaço para si";
        message = `
            <p>Às vezes, nos encontramos em situações nas quais parece haver pouca margem de escolha. Isso pode acontecer nos relacionamentos, no trabalho, nas responsabilidades do dia a dia ou nas expectativas que temos em relação a nós mesmos.</p>

            <p>Acostumamo-nos a nos adaptar, a atender às demandas e a fazer o que parece necessário, até perder um pouco de vista aquilo que realmente desejamos.</p>

            <p><strong>Uma primeira tomada de consciência:</strong> perceber onde você se sente sem espaço pode ajudar a reconhecer quanto lugar reserva às suas necessidades e às suas escolhas.</p>

            <p><strong>Um pequeno exercício (90 segundos):</strong> pense em uma situação recente em que você sentiu que tinha pouca liberdade de escolha. Experimente se perguntar: <em>"A pressão vinha principalmente de fora, das exigências ou expectativas dos outros, ou de dentro, daquilo que eu exigia de mim?"</em></p>

            <p><strong>E a partir daqui?</strong> Se você quiser dar mais um passo, podemos explorar juntos o que hoje limita seu espaço e quais possibilidades podem surgir para escolher com mais liberdade a direção que deseja seguir.</p>

            <p><em>Se você vive situações de controle, ameaça ou perigo, é importante buscar apoio especializado para proteger sua segurança.</em></p>
        `;
    }


    resultBox.innerHTML = `<h3>${title}</h3>${message} <p class="micro-note"><em>Este questionário é uma ferramenta de orientação e reflexão. Não oferece diagnósticos nem substitui avaliações ou acompanhamentos médicos ou psicoterapêuticos.</em></p>`;
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


console.log("guide-pt.js LOADED");


window.VIRADAS_STEP_CONTENT = {
  verita: {
    title: "Verdade",
    text: "Compreender com clareza o que está acontecendo, distinguindo fatos, emoções e interpretações."
  },
  identita: {
    title: "Identidade",
    text: "Reconectar-se com os próprios valores, necessidades e desejos, distinguindo-os daquilo que já não faz parte de si."
  },
  relazione: {
    title: "Relação",
    text: "Reconhecer papéis, expectativas e padrões recorrentes na relação consigo e com outras pessoas."
  },
  assertivita: {
    title: "Assertividade",
    text: "Praticar a expressão de necessidades e limites com clareza e firmeza gentil, sem agredir nem abrir mão de si."
  },
  direzione: {
    title: "Direção",
    text: "Escolher uma direção e transformar o desejo em projeto, passo a passo."
  },
  azione: {
    title: "Ação",
    text: "Experimentar pequenos passos para ampliar o espaço e criar novas possibilidades."
  },
  svolta: {
    title: "Virada",
    text: "Integrar e consolidar as mudanças, em uma virada que transforma sem atropelar."
  }
};
