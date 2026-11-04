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

    // LOGICA DI ASSEGNAZIONE BASATA SUI TAG DELLE RISPOSTE
    // Profilo 1: Vuoto o Umore clinico
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
        title = "Recuperar o fôlego e encontrar apoio";
        message = `
            <p>Se neste período você sente falta de ânimo e um cansaço que toma conta de quase tudo, talvez também perceba uma pressão constante. Às vezes é como ficar em uma nuvem de tristeza ou peso que impede qualquer iniciativa: isso pode acontecer quando se permanece por muito tempo em uma situação apertada, que acaba tirando o fôlego e a vontade de agir.</p>
            <p>Nesses momentos, até as coisas simples parecem muito pesadas e seus recursos parecem estar no limite. Você pode sentir muita frustração por querer mudar alguma coisa, mas achar que não tem espaço nem forças para isso.</p> 
            <p>É um sinal importante: seu organismo está indicando que, antes de agir, é preciso recuperar um pouco de chão.</p>
            <p><strong>Uma proposta útil (1 minuto):</strong>
            Em vez de se perguntar “o que eu deveria fazer?”, experimente parar e perguntar a si: <em>“Neste momento, preciso mais de um pequeno movimento para aliviar esse peso ou de ficar em repouso para recuperar energia?”</em></p>
            <p><strong>Uma reflexão a mais:</strong> Se você sente que esse desânimo é muito profundo ou que essa tristeza acompanha você há muito tempo, pode ser valioso conversar com um médico ou psicoterapeuta. Buscar apoio clínico nos momentos mais difíceis é uma forma importante de cuidar de si. Esse apoio pode caminhar junto com outros processos, como o counseling, quando você sentir necessidade de retomar seus projetos.</p>
        `;
    } 
    // Profilo 2: Pressione continua o Corpo
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
        title = "Reduzir o estado de alerta e a sobrecarga";
        message = `
            <p>Aqui aparece uma sobrecarga: seja como tensão no corpo ou como pensamentos que não param, o sinal é o mesmo. Seu organismo está em estado de alerta e pede que você desacelere porque chegou a um limite.</p>
            <p><strong>Uma regra de ouro nesses casos:</strong> é melhor aliviar uma pequena pressão do que acrescentar uma grande meta.</p>
            <p><strong>Uma proposta útil (2 minutos):</strong>
            Escolha um momento do dia em que sente mais pressão e pergunte a si: “Que pequena ação, pensamento ou situação aumenta essa pressão?” e “O que a reduz?”<br>
            Depois, faça apenas uma escolha: reduza em 10% aquilo que a aumenta (nem que seja só por hoje).</p>
            <p><strong>Uma dica prática:</strong> Se o corpo está sempre em estado de alerta, não adianta exigir mais de si: é melhor criar uma pequena rotina de recuperação, breve, viável e sem exigir perfeição.</p>
        `;
    } 
    // Profilo 3: Default (Relação/Spazio)
    else {
        title = "Recuperar espaço e margem de ação";
        message = `
            <p>Se você sente que está em uma situação que “aperta”, geralmente não se trata de falta de vontade, mas de falta de espaço. Quando sente que não tem margem para agir, seja em uma relação, um papel ou um compromisso, a primeira coisa que perde é a capacidade de enxergar onde ainda pode se movimentar.</p>
            <p><strong>O objetivo:</strong> Antes de decidir o que mudar, é importante entender exatamente onde e como você está perdendo seu espaço.</p>
            <p><strong>O exercício (90 segundos):</strong>
            Pense em uma situação recente em que sentiu pouca margem para agir. Observe por um instante: a pressão vem de fora (uma exigência, uma obrigação, uma pessoa) ou de dentro (pensamentos, expectativas, culpa)?<br><br>
            Agora pergunte a si: “Naquele momento, o que eu estava tentando proteger ou manter em segurança?” (minha tranquilidade, a imagem que tenho de mim, meu tempo, o controle, a aprovação dos outros...).</p>
            <p><strong>Uma pequena orientação:</strong> Quando você entende o que está protegendo e a que custo, a direção fica mais clara: não como uma decisão drástica, mas como um passo possível para recuperar um pouco de espaço.</p>
            <p><em>Atenção: se sua margem de ação está limitada por situações de controle ou perigo real, é fundamental não enfrentar tudo sem apoio. Buscar ajuda especializada é um primeiro passo para proteger sua segurança.</em></p>
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
