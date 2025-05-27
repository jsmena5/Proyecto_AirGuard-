customElements.define('home-section', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: #f2f6fc;
          animation: fadeIn 0.4s ease-in;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .container {
          text-align: center;
        }

        h1 {
          font-size: 2.2rem;
          color: #2a3b8f;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.1rem;
          color: #444;
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-img {
          margin-top: 1.5rem;
          width: 750px;
          height: auto;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        <h1>Bienvenido a AirGuard</h1>
        <p>Una plataforma educativa para monitorear y comprender la calidad del aire a tu alrededor.</p>
        <img class="hero-img" src="https://blog.indoamerica.edu.ec/wp-content/uploads/2024/09/portada-1.webp" alt="Aire limpio">
      </div>
    `;
  }
});
