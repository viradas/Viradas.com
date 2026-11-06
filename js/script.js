
"use strict";

const VIRADAS_MAP = {
  verita: [
    "Verità",
    "Fare chiarezza su ciò che sta accadendo, distinguendo tra fatti, emozioni e interpretazioni."
  ],
  identita: [
    "Identità",
    "Riappropriarsi dei propri valori, bisogni e desideri, distinguendoli da ciò che non ci appartiene più."
  ],
  relazione: [
    "Relazione",
    "Riconoscere ruoli, aspettative e schemi ricorrenti nella relazione con sé e con gli altri."
  ],
  assertivita: [
    "Assertività",
    "Allenarsi a esprimere bisogni e confini con chiarezza e gentile fermezza, senza aggredire né rinunciare."
  ],
  direzione: [
    "Direzione",
    "Scegliere una direzione e trasformare il desiderio in progetto, passo dopo passo."
  ],
  azione: [
    "Azione",
    "Sperimentare piccoli passi per allargare lo spazio e creare nuove possibilità."
  ],
  svolta: [
    "Svolta",
    "Integrare e consolidare i cambiamenti, in una svolta che trasforma senza travolgere."
  ]
};


const VIRADAS_MAP_TRANSLATIONS = {
  pt: {
    verita: [
      "Verdade",
      "Compreender com clareza o que está acontecendo, distinguindo fatos, emoções e interpretações."
    ],
    identita: [
      "Identidade",
      "Reconectar-se com os próprios valores, necessidades e desejos, distinguindo-os daquilo que já não faz parte de si."
    ],
    relazione: [
      "Relação",
      "Reconhecer papéis, expectativas e padrões recorrentes na relação consigo e com outras pessoas."
    ],
    assertivita: [
      "Assertividade",
      "Praticar a expressão de necessidades e limites com clareza e firmeza gentil, sem agredir nem abrir mão de si."
    ],
    direzione: [
      "Direção",
      "Escolher uma direção e transformar o desejo em projeto, passo a passo."
    ],
    azione: [
      "Ação",
      "Experimentar pequenos passos para ampliar o espaço e criar novas possibilidades."
    ],
    svolta: [
      "Virada (Svolta - em italiano)",
      "Integrar e consolidar as mudanças, em uma virada que transforma sem atropelar."
    ]
  },

  en: {
    verita: [
      "Truth (Verità - in italian)",
      "Gain clarity about what is happening, distinguishing facts, emotions and interpretations."
    ],
    identita: [
      "Identity",
      "Reconnect with your values, needs and desires, distinguishing them from what no longer belongs to you."
    ],
    relazione: [
      "Relationships",
      "Recognize roles, expectations and recurring patterns in your relationship with yourself and others."
    ],
    assertivita: [
      "Assertiveness",
      "Practise expressing needs and boundaries with clarity and gentle firmness, without aggression or giving up on yourself."
    ],
    direzione: [
      "Direction",
      "Choose a direction and turn a wish into a plan, one step at a time."
    ],
    azione: [
      "Action",
      "Try small steps to create more room and open up new possibilities."
    ],
    svolta: [
      "Turning point (Svolta - in italian)",
      "Integrate and consolidate changes, allowing a turning point that transforms without overwhelming."
    ]
  }
};


async function injectFragment(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Impossibile caricare il componente:", url, err);
    el.innerHTML = '<p class="wrap" style="padding:12px">Caricamento del componente non riuscito. Apri il sito tramite un server web.</p>';
  }
}

function initMenu() {
  const button = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!button || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "☰";
  };

  button.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(opened));
    button.textContent = opened ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", close)
  );

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", e => {
    if (!nav.contains(e.target) && !button.contains(e.target)) close();
  });

  const current = location.pathname.startsWith("/pt/")
    ? "pt"
    : location.pathname.startsWith("/en/")
    ? "en"
    : "it";

  document.querySelectorAll(".langs a").forEach(link => {
    if (link.lang === current) {
      link.setAttribute("aria-current", "page");
      link.style.fontWeight = "700";
    }
  });
}

function initMap() {
  const title = document.getElementById("mapTitle");
  const text = document.getElementById("mapText");
  if (!title || !text) return;

  document.querySelectorAll(".map-node").forEach(node => {
    const choose = () => {
     
const language = document.documentElement.lang.toLowerCase().split("-")[0];
const map = VIRADAS_MAP_TRANSLATIONS[language] || VIRADAS_MAP;
const val = map[node.dataset.key];

      if (!val) return;

      document.querySelectorAll(".map-node").forEach(n => {
        n.classList.remove("active");
        n.setAttribute("aria-pressed", "false");
      });

      node.classList.add("active");
      node.setAttribute("aria-pressed", "true");
      title.textContent = val[0];
      text.textContent = val[1];
    };

    node.addEventListener("click", choose);

    node.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        choose();
      }
    });
  });
}

function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectors = [
    '.hero .hero-copy > *', '.hero .hero-art',
    '#per-chi .wrap > .eyebrow', '#per-chi .wrap > h2',
    '#per-chi .leadshort', '#per-chi .recognition article', '#per-chi .test',
    '#proposte .eyebrow', '#proposte h2', '#proposte .leadshort',
    '#proposte .offers > .offer',
    '#come .eyebrow', '#come h2', '#come .step', '#come .facts',
    '#approccio .method > *',
    '#virada-lab .lab-copy > *',
    '.marlene-preview-photo', '.marlene-preview-content > *',
    '.section .mode', '.section .modalities-note', '.section .events-panel',
    '.section .portrait', '.section .about > div:last-child > *',
    '#faq .eyebrow', '#faq h2', '#faq .faq-grid > *',
    '#contatti .editorial-contact-info > *', '#contatti .editorial-contact-form',
    '.events-hero .events-kicker', '.events-hero h1', '.events-hero p',
    '.events-section-head', '.events-empty', '.events-page .archive-row',
    '.profile-hero .wrap > *', '.profile-layout > *', '.profile-columns article'
  ];

  // Compatibilità con sezioni rinominate: individua Per chi e Approccio
  // anche se il loro id non è quello usato nelle versioni precedenti.
  document.querySelectorAll('main section').forEach(section => {
    const heading = section.querySelector('h2');
    const name = (heading?.textContent || '').toLocaleLowerCase('it');
    if (name.includes('per chi')) {
      selectors.push('section .recognition article');
    }
    if (name.includes('mappa') || name.includes('approccio')) {
      section.querySelectorAll('.method > *').forEach(el => el.dataset.viradasReveal = 'true');
    }
  });
  selectors.push('[data-viradas-reveal="true"]');

  const targets = [...new Set(document.querySelectorAll(selectors.join(',')))];
  // Le classi legacy non devono tenere nascosti i contenuti.
  document.querySelectorAll('.fade').forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.offers .offer').forEach(el => el.classList.add('card-visible'));
  if (reduced || !('IntersectionObserver' in window)) return;

  const targetSet = new Set(targets);
  targets.forEach(el => {
    el.classList.add('viradas-animate');
    const siblings = [...el.parentElement.children].filter(child => targetSet.has(child));
    const delay = Math.min(Math.max(siblings.indexOf(el), 0), 4) * 95;
    el.style.setProperty('--viradas-stagger', `${delay}ms`);
  });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('viradas-animated');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });
  targets.forEach(el => observer.observe(el));
}

function initLegal() {
  const modal = document.getElementById("legalModal");
  const close = document.getElementById("closeLegal");
  if (!modal || !close) return;

  const open = () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const dismiss = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", e => {
    const link = e.target.closest(".open-legal");
    if (link) {
      e.preventDefault();
      open();
    }
  });

  close.addEventListener("click", dismiss);

  modal.addEventListener("click", e => {
    if (e.target === modal) dismiss();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      dismiss();
    }
  });

  if (location.hash === "#legale") open();
}

function loadGA() {
  if (window.viradasGALoaded) return;
  window.viradasGALoaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-6FQ76Y8VLX";
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", "G-6FQ76Y8VLX", {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
}

function initCookie() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  let choice = null;

  try {
    choice = localStorage.getItem("cookie-consent");
  } catch (e) {}

  if (choice === "accepted") {
    loadGA();
  } else if (!choice) {
    banner.style.display = "block";
  }

  const save = value => {
    try {
      localStorage.setItem("cookie-consent", value);
    } catch (e) {}

    banner.style.display = "none";

    if (value === "accepted") loadGA();
  };

  document.getElementById("cookie-accept")?.addEventListener(
    "click",
    () => save("accepted")
  );

  document.getElementById("cookie-decline")?.addEventListener(
    "click",
    () => save("declined")
  );

  document.addEventListener("click", e => {
    const link = e.target.closest("#cookie-settings");
    if (!link) return;
    e.preventDefault();
    try { localStorage.removeItem("cookie-consent"); } catch (err) {}
    window.location.reload();
  });
}

function initThanks() {
  if (new URLSearchParams(location.search).get("sent") === "1") {
    const p = document.getElementById("thanksPopup");

    if (p) {
      p.style.display = "block";
      setTimeout(() => p.style.display = "none", 6500);
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  initMap();
  initReveal();
  initThanks();

  await Promise.all([
    injectFragment("#site-header", "./header.html"),
    injectFragment("#site-footer", "./footer.html")
  ]);

  initMenu();
  initLegal();
  initCookie();

  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
});

// VIRADAS — Invio Formspree e conferma multilingue
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("thanksPopup");

  if (!form || !popup) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;

    try {
      const response = await fetch(
        "https://formspree.io/f/xnppwdep",
        {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        }
      );

      if (!response.ok) {
        throw new Error("Invio non riuscito");
      }

      const lang = (
        document.documentElement.lang || "it"
      ).toLowerCase();

      let message =
        "Grazie per il messaggio, risponderò al più presto possibile.";

      if (lang.startsWith("pt")) {
        message =
          "Obrigada pela sua mensagem. Responderei assim que possível.";
      } else if (lang.startsWith("en")) {
        message =
          "Thank you for your message. I'll get back to you as soon as possible.";
      }

      popup.textContent = message;
      popup.style.display = "block";

      form.reset();

      setTimeout(() => {
        popup.style.display = "none";
      }, 6500);

    } catch (error) {
      alert(
        "Non è stato possibile inviare il messaggio. Riprova più tardi."
      );
    } finally {
      if (button) button.disabled = false;
    }
  });
});




function cambiaLingua(lang) {
    const url = new URL(window.location.href);
        // La pagina Eventi esiste solo in italiano:
    // da lì il cambio lingua porta alla home della lingua scelta.
    if (url.pathname.endsWith("/events.html")) {
        window.location.assign(
            lang === "it" ? "/index.html" : "/" + lang + "/index.html"
        );
        return;
    }
    const parti = url.pathname.split("/").filter(Boolean);

    // Individua la lingua attuale
    const indiceLingua = parti.findIndex(
        parte => parte === "en" || parte === "pt"
    );

    // Elimina la lingua attuale dal percorso
    if (indiceLingua !== -1) {
        parti.splice(indiceLingua, 1);
    }

    // Aggiunge la nuova lingua prima del nome della pagina
    if (lang !== "it") {
        const posizione = indiceLingua !== -1
            ? indiceLingua
            : Math.max(0, parti.length - 1);

        parti.splice(posizione, 0, lang);
    }

    // Conserva la pagina, i parametri e l'eventuale ancora
    url.pathname = "/" + parti.join("/");

    window.location.assign(url.href);
}

document.querySelectorAll('#faq details').forEach((faq) => {
  faq.addEventListener('toggle', () => {
    if (faq.open) {
      document.querySelectorAll('#faq details').forEach((other) => {
        if (other !== faq) {
          other.open = false;
        }
      });
    }
  });
});



/* FAQ Marlene — una sola aperta alla volta */
document.querySelectorAll('.profile-experience .faq details')
  .forEach((faq) => {
    faq.addEventListener('toggle', () => {
      if (!faq.open) return;

      document.querySelectorAll('.profile-experience .faq details')
        .forEach((other) => {
          if (other !== faq && other.open) {
            other.open = false;
          }
        });
    });
  });
