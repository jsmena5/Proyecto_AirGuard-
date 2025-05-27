// Definimos una clase para un componente personalizado llamado EducationSection que extiende de HTMLElement
class EducationSection extends HTMLElement {
  constructor() {
    super();
    // Adjuntamos un Shadow DOM al componente para encapsular el estilo y estructura
    this.attachShadow({ mode: 'open' });

    // Datos de artículos educativos sobre contaminación del aire
    this.articles = [
      {
        title: "¿Qué es la Contaminación del Aire?",
        content: "La contaminación del aire se refiere a la introducción de sustancias nocivas en la atmósfera..."
      },
      {
        title: "¿Qué son los PM2.5 y por qué son peligrosos?",
        content: "Las partículas PM2.5 tienen un diámetro menor a 2.5 micrómetros..."
      },
      {
        title: "Impacto de los PM10 en la salud",
        content: "Los PM10, aunque más grandes que los PM2.5, también pueden ser inhalados..."
      },
      {
        title: "Ozono troposférico: El contaminante invisible",
        content: "A diferencia del ozono estratosférico, el ozono a nivel del suelo es un gas tóxico..."
      },
      {
        title: "Monóxido de Carbono y su efecto en el cuerpo",
        content: "Este gas incoloro e inodoro se produce por la combustión incompleta de combustibles..."
      },
      {
        title: "Dióxido de Azufre (SO2) y su influencia ambiental",
        content: "El SO2 proviene de la quema de carbón y petróleo. Provoca irritación de ojos y vías respiratorias..."
      },
      {
        title: "Efectos en la infancia: una población vulnerable",
        content: "Los niños son especialmente sensibles a la contaminación del aire debido a su sistema inmunológico..."
      },
      {
        title: "Contaminación del aire en interiores",
        content: "Muchos piensan que la contaminación solo está en el exterior, pero dentro de casa hay fuentes como el humo del tabaco..."
      },
      {
        title: "Cambio climático y contaminación del aire",
        content: "Muchos contaminantes atmosféricos contribuyen también al cambio climático, como el carbono negro y el metano..."
      },
      {
        title: "Soluciones sostenibles a nivel personal y comunitario",
        content: "Caminar, usar bicicleta, transporte público, consumir energía limpia y promover zonas verdes urbanas ayudan a reducir la contaminación..."
      }
    ];

    // Datos para las preguntas del quiz
    this.questions = [
      {
        q: "¿Qué significa PM2.5?",
        options: ["Partículas mayores a 2.5 mm", "Partículas menores a 2.5 micrómetros", "Presión Media 2.5", "Polvo Magnético 2.5"],
        correct: 1 // La respuesta correcta es la opción 1
      },
      {
        q: "¿Qué gas a nivel del suelo puede dañar los pulmones?",
        options: ["Ozono", "Nitrógeno", "Helio", "Neón"],
        correct: 0 // La respuesta correcta es la opción 0 (Ozono)
      }
    ];
  }

  // Método que se ejecuta cuando el componente se agrega al DOM
  connectedCallback() {
    this.render(); // Llamamos a la función render para mostrar el contenido
  }

  // Función que genera el contenido HTML dentro del Shadow DOM
  render = () => {
    // Inyectamos el HTML y CSS en el Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos para el componente */
        :host {
          display: block;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(#cdeeff, #ffffff);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        h2 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 30px;
          color: #2a4d69;
        }

        .cloud-card {
          position: relative;
          background: #fff;
          border-radius: 50% / 30%;
          margin: 20px auto;
          padding: 20px 25px;
          max-width: 700px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          animation: float 4s ease-in-out infinite;
        }

        .cloud-card h3 {
          margin-top: 0;
          color: #225;
        }

        .cloud-card p {
          text-align: justify;
        }

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
          margin-left: auto;
          margin-right: auto;
        }

        .question {
          font-weight: bold;
          margin-bottom: 10px;
        }

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
      </style>

      <!-- Título principal -->
      <h2>☁️ Parte Educativa</h2>

      <!-- Renderizamos los artículos -->
      ${this.articles.map(a => `
        <div class="cloud-card">
          <h3>${a.title}</h3>
          <p>${a.content}</p>
        </div>
      `).join('')}

      <!-- Sección del quiz -->
      <div class="quiz">
        <h3>🧩 Juego: ¿Cuánto sabes sobre contaminación?</h3>
        <div id="quiz-content"></div>
        <div class="feedback" id="quiz-feedback"></div>
      </div>
    `;

    this.loadQuiz(); // Cargamos las preguntas del quiz
  }

  // Función que carga las preguntas del quiz y gestiona la interacción
  loadQuiz() {
    const container = this.shadowRoot.querySelector("#quiz-content");
    const feedback = this.shadowRoot.querySelector("#quiz-feedback");
    let currentQuestion = 0; // Indicador de la pregunta actual

    // Función para renderizar la pregunta actual
    const renderQuestion = () => {
      // Si ya no hay más preguntas, mostramos un mensaje de finalización
      if (currentQuestion >= this.questions.length) {
        container.innerHTML = `<p>¡Has completado el quiz! 🎉</p>`;
        return;
      }

      const q = this.questions[currentQuestion]; // Obtenemos la pregunta actual
      container.innerHTML = `
        <div class="question">${q.q}</div>
        <div class="options">
          ${q.options.map((opt, i) => `<button data-index="${i}">${opt}</button>`).join('')}
        </div>
      `;

      // Asignamos eventos a los botones de opciones
      container.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          // Verificamos si la opción seleccionada es correcta
          if (idx === q.correct) {
            feedback.textContent = "✅ ¡Correcto!"; // Si es correcto
          } else {
            feedback.textContent = "❌ Incorrecto."; // Si es incorrecto
          }
          currentQuestion++; // Avanzamos a la siguiente pregunta
          setTimeout(() => {
            feedback.textContent = ""; // Limpiamos el feedback
            renderQuestion(); // Renderizamos la siguiente pregunta
          }, 1200); // Esperamos un segundo antes de pasar a la siguiente
        });
      });
    };

    renderQuestion(); // Inicializamos la carga del quiz
  }
}

// Registramos el nuevo elemento customizado
customElements.define('education-section', EducationSection);