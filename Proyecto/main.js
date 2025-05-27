import './components/main-menu.js';
import './components/nav-sidebar.js';
import './components/footer.js';
import './components/air-quality-chart.js';
import './components/data-crud.js';
import './components/education-section.js';
import './components/user-recommendation.js';
import './components/home-section.js';
import './components/about-section.js';

const globalStyles = `
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #e0e5ec, #ffffff);
    color: #333;
  }

    main {
      display: flex;
      flex: 1;
      flex-direction: row;
    }

    .content {
      flex: 1;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      main {
        flex-direction: column;
      }

      nav-sidebar {
        width: 100%;
      }
    }
`;

// Inyectar estilos globales en el <head>
const styleTag = document.createElement('style');
styleTag.textContent = globalStyles;
document.head.appendChild(styleTag);



// Mapeo de vistas
const routes = {
  '#inicio': `<home-section></home-section>`,
  '#acerca': `<about-section></about-section>`,
  '#educate': `<education-section></education-section>`,
  '#dashboard': `<air-quality-chart></air-quality-chart>`,
  '#recomendaciones': `<data-crud></data-crud>`,
  '#educativo': `<user-recommendations></user-recommendations>`,
};

// Renderiza la vista basada en el hash actual
function renderView() {
  const hash = window.location.hash || '#inicio';
  const content = routes[hash] || `<h1>404</h1><p>Sección no encontrada.</p>`;
  document.getElementById('app-content').innerHTML = content;
}

// Cargar la vista al cargar la página o cambiar el hash
window.addEventListener('load', renderView);
window.addEventListener('hashchange', renderView);
