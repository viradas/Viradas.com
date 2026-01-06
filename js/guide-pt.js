/* === QUIZ PERCORSI ATUALIZADO (Versão Consciência e Impulso) === */

console.log("QUIZ arquivo carregado:", location.pathname);

function initQuiz() {
  const steps = [
    {
      id: 1,
      multi: false,
      question: "Que sensação te acompanha neste período?",
      options: [
        { tag: "relazione", text: "Sinto-me apertada/o, como se não tivesse espaço nem tempo para ser ou fazer o que gostaria." },
        { tag: "strumenti", text: "Não me sinto tão capaz quanto gostaria, parece que algo me falta ou me trava." },
        { tag: "corpo", text: "Vivo sob uma pressão constante, como se tivesse sempre que sustentar algo." },
        { tag: "vuoto", text: "Sinto uma falta de impulso, como se tivesse perdido o interesse." }
      ]
    },
    {
      id: 2,
      multi: false,
      question: "O que você acha que poderia te ajudar ou te aliviar um pouco neste período?",
      options: [
        { tag: "relazione", text: "Mudar o olhar e entender o que eu realmente quero, o que me faz bem." },
        { tag: "strumenti", text: "Saber como me mover para mudar a situação atual, passo a passo." },
        { tag: "corpo", text: "Recuperar energia e vitalidade, sinto muito cansaço." },
        { tag: "vuoto", text: "Voltar a sentir um propósito ou um desejo por algo." }
      ]
    },
    {
      id: 3,
      multi: true,
      question: "Onde essa dificuldade se manifesta mais?",
      options: [
        { tag: "relazione", text: "Nas relações: eu me adapto, não digo não, não me sinto vista/o." },
        { tag: "strumenti", text: "Nas decisões: adio, não me movo, sinto-me bloqueada/o." },
        { tag: "corpo", text: "No corpo: tensão constante, sensação de peso ou um cansaço que não passa com o descanso." },
        { tag: "orientamento", text: "Nos pensamentos: a mente está sempre ligada (ruminação) ou então vazia, com dificuldade de concentração." }
      ]
    },
    {
      id: 4,
      multi: true,
      question: "O que você pensa desses sinais hoje?",
      options: [
        { tag: "corpo", text: "Relaciono principalmente ao estresse ou a um período difícil." },
        { tag: "orientamento_cond", text: "Sei o que está por trás disso e estou tentando lidar, mesmo que não seja simples." },
        { tag: "ascoltare", text: "Sinto que são sinais importantes que precisam ser escutados com cuidado." },
        { tag: "umore_clinico", text: "Esse sentimento de vazio ou de cansaço profundo me preocupa." },
        { tag: "fanno_male", text: "Percebo que alguns hábitos ou reações já não me fazem bem." }
      ]
    },
    {
      id: 5,
      multi: true,
      question: "O que você sente que pode fazer agora, sem adicionar mais pressão?",
      options: [
        { tag: "riflessione", text: "Parar e dar sentido ao que estou vivendo." },
        { tag: "azione", text: "Tentar fazer algo diferente, mesmo que pequeno e concreto." },
        { tag: "corpo", text: "Colocar mais ordem nas minhas rotinas e hábitos diários." },
        { tag: "supporto", text: "Avaliar se esses sinais merecem também um olhar médico ou psicológico." }
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
    const hintText = step.multi ? "<b>MAIS DE UMA</b> resposta possível." : "<b>APENAS UMA</b> resposta.";

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
        <p class="hint-error hidden">Escolha pelo menos uma resposta para continuar.</p>
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

    // Perfil 1: Vazio ou humor clínico
    if (allTags.includes("vuoto") || allTags.includes("umore_clinico")) {
      title = "Recuperar fôlego e base";
      message = `
        <p>Se neste período você sente que o impulso falta e que um cansaço invade tudo, é provável que exista também uma pressão de fundo. Às vezes nos sentimos presas/os em uma nuvem de tristeza ou peso que bloqueia qualquer iniciativa: isso acontece quando permanecemos por muito tempo em uma situação apertada, que acaba tirando o fôlego e a vontade de agir.</p>
        <p>Nesses momentos, até as coisas simples parecem muito pesadas e seus recursos parecem reduzidos ao mínimo. Pode surgir uma forte frustração: você gostaria de mudar algo, mas sente que não tem espaço nem força para isso.</p>
        <p>Esse é um sinal importante: o seu sistema está dizendo que, antes de agir, é preciso recuperar terreno.</p>
        <p><strong>Algo útil (1 minuto):</strong>
        Em vez de se perguntar “o que eu deveria fazer?”, tente parar e se perguntar:
        <em>“Agora eu preciso mais de um pequeno movimento para dissolver esse peso ou de ficar parada/o para recuperar energia?”</em></p>
        <p><strong>Um pensamento a mais:</strong>
        Se você sente que esse apagamento é muito profundo ou que essa tristeza te acompanha há muito tempo, pode ser valioso conversar com um médico ou psicoterapeuta. Ter um apoio clínico nos momentos de maior escuridão é um grande ato de respeito consigo mesma/o, e pode caminhar junto com outros percursos, como o counseling, quando você sentir vontade de retomar sua capacidade de projetar o futuro.</p>
      `;
    }
    // Perfil 2: Pressão contínua / Corpo
    else if (allTags.includes("corpo") || allTags.includes("fanno_male")) {
      title = "Diminuir o estado de alerta e o peso";
      message = `
        <p>Aqui aparece uma sobrecarga: seja como tensão no corpo ou como pensamentos que não param, o sinal é o mesmo. O seu sistema está “em alerta” e está pedindo para desacelerar, porque chegou a um limite.</p>
        <p><strong>Regra de ouro nesses casos:</strong> é melhor retirar uma pequena pressão do que adicionar um grande objetivo.</p>
        <p><strong>Algo útil (2 minutos):</strong>
        Escolha um momento do dia em que você sente mais pressão e pergunte-se:
        “Que pequena ação, pensamento ou situação aumenta essa pressão?” e
        “Qual a reduz?”<br>
        Depois faça apenas uma escolha: reduza em 10% aquilo que a aumenta (mesmo que só por hoje).</p>
        <p><strong>Dica prática:</strong>
        Se o corpo está sempre “em alerta”, não adianta forçar mais: é preciso criar uma pequena rotina de recuperação, curta, possível e sem exigência de perfeição.</p>
      `;
    }
    // Perfil 3: Espaço / Relação
    else {
      title = "Recuperar espaço e margem de ação";
      message = `
        <p>Quando você se sente em uma situação que “aperta”, geralmente não é falta de vontade, mas falta de espaço. Quando não há margem de manobra — seja em uma relação, em um papel ou em um compromisso — a primeira coisa que se perde é a capacidade de enxergar onde ainda é possível se mover.</p>
        <p><strong>O objetivo:</strong>
        Antes de decidir o que mudar, é preciso entender com precisão onde e como você está perdendo espaço.</p>
        <p><strong>O exercício (90 segundos):</strong>
        Pense em uma situação recente em que você sentiu pouca margem de ação. Observe por um instante:
        a pressão vem de fora (um pedido, uma obrigação, uma pessoa) ou de dentro (pensamentos, expectativas, culpa)?<br><br>
        Agora pergunte-se:
        “Naquele momento, o que eu estava tentando proteger ou manter seguro?”
        (minha paz, uma imagem de mim, meu tempo, o controle, a aprovação dos outros...).</p>
        <p><strong>Pequena orientação:</strong>
        Quando você entende o que está protegendo — e a que custo — a direção fica mais clara: não como uma escolha drástica, mas como um passo possível para recuperar um pouco de terreno.</p>
        <p><em>Observação importante: se você sente que sua margem de ação está bloqueada por situações reais de controle ou perigo, é fundamental não enfrentar isso sozinha/o. Buscar um apoio específico é o primeiro ato de proteção da própria integridade.</em></p>
      `;
    }

    resultBox.innerHTML = `
      <h3>${title}</h3>
      ${message}
      <p class="micro-note"><em>Este quiz é uma ferramenta de orientação e reflexão. Não fornece diagnósticos nem substitui avaliações ou acompanhamentos médicos ou psicoterapêuticos.</em></p>
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
