export class MainFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', sans-serif;
        }

        footer {
          background: linear-gradient(90deg, #5a8dee, #94b5ff);
          color: white;
          text-align: center;
          padding: 1rem 2rem;
          font-size: 0.95rem;
          position: relative;
          box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.5s ease-in;
        }

        .team {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <footer>
        &copy; ${new Date().getFullYear()} AirGuard. Todos los derechos reservados.
        <div class="team">Desarrollado por el equipo: Mateo, Oscar, James</div>
      </footer>
    `;
  }
}

// Registrar el componente
customElements.define('main-footer', MainFooter);
