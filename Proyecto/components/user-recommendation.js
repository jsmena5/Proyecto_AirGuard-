class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

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

  connectedCallback() {
    this.render();
    this.addClickListeners();
  }

  addClickListeners = () => {
    const leafs = this.shadowRoot.querySelectorAll('.leaf');
    leafs.forEach(leaf => {
      leaf.addEventListener('click', () => {
        leaf.classList.toggle('expanded');
      });
    });
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        h3 {
          font-family: Arial, sans-serif;
          color: #2f5d3d;
          text-align: center;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

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

        .leaf.expanded {
          transform: scale(1.6);
          font-size: 1.4em;
          padding: 40px;
          z-index: 1;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      </style>

      <h3>🌿 Recomendaciones para Protegerte del Aire Contaminado 🌿</h3>
      <div class="container">
        ${this.recommendations.map(rec => `<div class="leaf">${rec}</div>`).join('')}
      </div>
    `;
  }
}

customElements.define('user-recommendations', UserRecommendations);