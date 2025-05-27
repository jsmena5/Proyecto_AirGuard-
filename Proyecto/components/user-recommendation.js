// Definimos la clase UserRecommendations que extiende de HTMLElement para crear un elemento personalizado
class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    // Creamos un Shadow DOM para encapsular el estilo y contenido del componente
    this.attachShadow({ mode: 'open' });

    // Lista de recomendaciones relacionadas con la protección contra el aire contaminado
    this.recommendations = [
      "Evita hacer ejercicio al aire libre cuando los niveles de PM2.5 sean altos, ya que estas partículas finas pueden penetrar profundamente en los pulmones.",
      "Utiliza purificadores de aire con filtro HEPA en interiores para reducir la presencia de PM2.5 y PM10.",
      "Mantén las ventanas cerradas durante días con alta contaminación, especialmente si vives cerca de vías de tráfico o construcción.",
      "Consulta aplicaciones de calidad del aire antes de salir para planificar mejor tus actividades al aire libre.",
      "Evita quemar madera, basura o materiales plásticos; estos generan partículas PM2.5 peligrosas.",
      "Si estás en una zona urbana, planta vegetación alrededor de tu hogar; algunas plantas ayudan a filtrar partículas contaminantes.",
      "En días de alta contaminación, trasládate en bicicleta con mascarilla o utiliza transporte público para reducir emisiones.",
      "Limpia regularmente tu hogar con trapos húmedos para evitar que el polvo (PM10) se suspenda en el aire.",
    ];
  }

  // Método que se ejecuta cuando el componente se conecta al DOM
  connectedCallback() {
    this.render();  // Llamamos a la función render para generar la estructura del componente
    this.addClickListeners();  // Añadimos los listeners para los clics en los elementos
  }

  // Método que agrega los event listeners para expandir/contraer las "hojas" al hacer clic
  addClickListeners = () => {
    // Seleccionamos todos los elementos con la clase 'leaf'
    const leafs = this.shadowRoot.querySelectorAll('.leaf');
    leafs.forEach(leaf => {
      // Agregamos un listener que alterna la clase 'expanded' al hacer clic
      leaf.addEventListener('click', () => {
        leaf.classList.toggle('expanded');
      });
    });
  }

  // Método que renderiza el HTML y el estilo del componente
  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilo del título principal */
        h3 {
          font-family: Arial, sans-serif;
          color: #2f5d3d;
          text-align: center;
        }

        /* Estilo para el contenedor principal de las hojas */
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        /* Estilo de cada "hoja" en el contenedor */
        .leaf {
          background: linear-gradient(135deg, #a8e6a1, #6fdc6f);
          border: 3px solid #235d2a;
          border-radius: 50% 50% 40% 60% / 60% 50% 50% 40%;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          width: 250px;
          font-family: sans-serif;
          color: #1f3b1f;
          text-shadow: 1px 1px 2px white;
          cursor: pointer;
          transition: transform 0.3s ease, font-size 0.3s ease, padding 0.3s ease;
          animation: float 4s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Estilo cuando una hoja es expandida al hacer clic */
        .leaf.expanded {
          transform: scale(1.3);  // Aumenta el tamaño de la hoja
          font-size: 1.2em;  // Aumenta el tamaño de la fuente
          padding: 30px;  // Aumenta el padding
          z-index: 1;  // Asegura que la hoja expandida quede encima de las demás
        }

        /* Animación de flotación para las hojas */
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      </style>

      <!-- Título de las recomendaciones -->
      <h3>🌿 Recomendaciones para Protegerte del Aire Contaminado 🌿</h3>
      <!-- Contenedor de las hojas -->
      <div class="container">
        <!-- Iteramos sobre las recomendaciones y las mostramos dentro de elementos "hoja" -->
        ${this.recommendations.map(rec => `<div class="leaf">${rec}</div>`).join('')}
      </div>
    `;
  }
}

// Definimos el custom element con el nombre 'user-recommendations'
customElements.define('user-recommendations', UserRecommendations);