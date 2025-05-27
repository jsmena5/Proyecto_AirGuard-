class EducationSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.articles = [
      { title: "¿Qué es la Contaminación del Aire?", content: "La contaminación del aire se refiere a la introducción de sustancias nocivas en la atmósfera..." },
      { title: "¿Qué son los PM2.5 y por qué son peligrosos?", content: "Las partículas PM2.5 tienen un diámetro menor a 2.5 micrómetros..." },
      { title: "Impacto de los PM10 en la salud", content: "Los PM10, aunque más grandes que los PM2.5, también pueden ser inhalados..." },
      { title: "Ozono troposférico: El contaminante invisible", content: "A diferencia del ozono estratosférico, el ozono a nivel del suelo es un gas tóxico..." },
      { title: "Monóxido de Carbono y su efecto en el cuerpo", content: "Este gas incoloro e inodoro se produce por la combustión incompleta de combustibles..." },
      { title: "Dióxido de Azufre (SO2) y su influencia ambiental", content: "El SO2 proviene de la quema de carbón y petróleo. Provoca irritación de ojos y vías respiratorias..." },
      { title: "Efectos en la infancia: una población vulnerable", content: "Los niños son especialmente sensibles a la contaminación del aire debido a su sistema inmunológico..." },
      { title: "Contaminación del aire en interiores", content: "Muchos piensan que la contaminación solo está en el exterior, pero dentro de casa hay fuentes como el humo del tabaco..." },
      { title: "Cambio climático y contaminación del aire", content: "Muchos contaminantes atmosféricos contribuyen también al cambio climático, como el carbono negro y el metano..." },
      { title: "Soluciones sostenibles a nivel personal y comunitario", content: "Caminar, usar bicicleta, transporte público, consumir energía limpia y promover zonas verdes urbanas ayudan a reducir la contaminación..." }
    ];

    this.questions = [
      {
        q: "¿Qué significa PM2.5?",
        options: ["Partículas mayores a 2.5 mm", "Partículas menores a 2.5 micrómetros", "Presión Media 2.5", "Polvo Magnético 2.5"],
        correct: 1
      },
      {
        q: "¿Qué gas a nivel del suelo puede dañar los pulmones?",
        options: ["Ozono", "Nitrógeno", "Helio", "Neón"],
        correct: 0
      },
      {
        q: "¿Qué gas es incoloro, inodoro y se produce por combustión incompleta?",
        options: ["Ozono", "Monóxido de carbono", "Dióxido de azufre", "Metano"],
        correct: 1
      },
      {
        q: "¿Qué población es más vulnerable a la contaminación del aire?",
        options: ["Adultos", "Personas mayores", "Niños", "Atletas"],
        correct: 2
      },
      {
        q: "¿Qué acción ayuda a reducir la contaminación del aire?",
        options: ["Usar auto privado", "Consumir carbón", "Caminar o usar bicicleta", "Quemar basura"],
        correct: 2
      }
    ];
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(#cdeeff, #ffffff);
          padding: 20px;
        }
        h2 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 30px;
          color: #2a4d69;
        }
        .cloud-card {
          background: #fff;
          border-radius: 50% / 30%;
          margin: 20px auto;
          padding: 20px 25px;
          max-width: 700px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          animation: float 4s ease-in-out infinite;
        }
        .cloud-card h3 { margin-top: 0; color: #225; }
        .cloud-card p { text-align: justify; }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .quiz {
          background: #d4f4dd;
          padding: 20px;
          border-radius: 12px;
          margin-top: 40px;
          max-width: 700px;
          margin: 40px auto;
        }
        .question { font-weight: bold; margin-bottom: 10px; }
        .options button {
          margin: 6px 0;
          display: block;
          width: 100%;
          padding: 10px;
          border: none;
          background: #a4d7a7;
          cursor: pointer;
          border-radius: 6px;
        }
        .options button:hover {
          background: #82c48b;
        }
        .feedback {
          margin-top: 10px;
          font-weight: bold;
          text-align: center;
        }
        .score {
          text-align: center;
          font-size: 1.3em;
          font-weight: bold;
          margin-top: 20px;
        }
        .show-answers {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background: #7ec4ff;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          cursor: pointer;
        }
      </style>

      <h2>☁️ Parte Educativa</h2>
      ${this.articles.map(a => `
        <div class="cloud-card">
          <h3>${a.title}</h3>
          <p>${a.content}</p>
        </div>
      `).join('')}

      <div class="quiz">
        <h3>🧩 Juego: ¿Cuánto sabes sobre contaminación?</h3>
        <div id="quiz-content"></div>
        <div class="feedback" id="quiz-feedback"></div>
        <div class="score" id="quiz-score"></div>
        <button class="show-answers" id="show-answers-btn" style="display:none;">Ver respuestas correctas</button>
        <div id="correct-answers"></div>
      </div>
    `;

    this.loadQuiz();
  }

  loadQuiz() {
    const container = this.shadowRoot.querySelector("#quiz-content");
    const feedback = this.shadowRoot.querySelector("#quiz-feedback");
    const scoreEl = this.shadowRoot.querySelector("#quiz-score");
    const showAnswersBtn = this.shadowRoot.querySelector("#show-answers-btn");
    const answersEl = this.shadowRoot.querySelector("#correct-answers");

    let currentQuestion = 0;
    let score = 0;

    const renderQuestion = () => {
      if (currentQuestion >= this.questions.length) {
        container.innerHTML = `<p>¡Has completado el quiz! 🎉</p>`;
        scoreEl.textContent = `Tu puntuación: ${score}/100`;
        showAnswersBtn.style.display = "block";
        return;
      }

      const q = this.questions[currentQuestion];
      container.innerHTML = `
        <div class="question">${q.q}</div>
        <div class="options">
          ${q.options.map((opt, i) => `<button data-index="${i}">${opt}</button>`).join('')}
        </div>
      `;
      feedback.textContent = "";

      container.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          const correctText = q.options[q.correct];
          if (idx === q.correct) {
            feedback.textContent = `✅ ¡Correcto! Respuesta: "${correctText}"`;
            score += 20;
          } else {
            feedback.textContent = `❌ Incorrecto. La respuesta correcta es: "${correctText}"`;
          }

          container.querySelectorAll("button").forEach(b => b.disabled = true);

          setTimeout(() => {
            currentQuestion++;
            renderQuestion();
          }, 1500);
        });
      });
    };

    showAnswersBtn.addEventListener("click", () => {
      answersEl.innerHTML = `
        <h4>✅ Respuestas correctas:</h4>
        <ul>
          ${this.questions.map((q, i) => `<li><strong>${i + 1}.</strong> ${q.q}<br>✔️ ${q.options[q.correct]}</li>`).join('')}
        </ul>
      `;
    });

    renderQuestion();
  }
}

customElements.define('education-section', EducationSection);