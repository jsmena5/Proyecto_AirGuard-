export class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
          width: 220px;
          background: linear-gradient(180deg, #e0e5ec, #ffffff);
          box-shadow: inset 6px 6px 12px #c8d0e7, inset -6px -6px 12px #ffffff;
          padding: 1.5rem 1rem;
          font-family: 'Segoe UI', sans-serif;
        }

        nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: fadeIn 0.5s ease-in;
          min-height: 100vh;
        }

        a {
          text-decoration: none;
          color: #333;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: #e0e5ec;
          box-shadow: 4px 4px 8px #c8d0e7, -4px -4px 8px #ffffff;
          transition: all 0.3s ease;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        a:hover {
          background: #d1d9e6;
          box-shadow: inset 2px 2px 6px #c8d0e7, inset -2px -2px 6px #ffffff;
          color: #0077cc;
        }

        .sidebar-title {
          margin-bottom: 2rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: #444;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      </style>

      <div class="sidebar-title">Menú Navegación</div>
      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#recomendaciones">Recomendaciones de usuarios</a>
        <a href="#educativo">Recomendaciones</a>
      </nav>
    `;
  }
}

// Definición del custom element
customElements.define('nav-sidebar', NavSidebar);
