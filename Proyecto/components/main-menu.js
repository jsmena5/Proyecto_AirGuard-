// Definimos la clase MainMenu, que extiende de HTMLElement, para crear un menú de navegación personalizado
export class MainMenu extends HTMLElement {
  constructor() {
    super();
    // Creamos un Shadow DOM para encapsular el estilo y la estructura del componente
    this.attachShadow({ mode: 'open' });
  }

  // Este método se ejecuta cuando el componente se conecta al DOM
  connectedCallback() {
    // Definimos el contenido HTML y CSS que se va a renderizar dentro del Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        /* El host es el propio componente, en este caso el contenedor de todo el menú */
        :host {
          display: block;
        }

        /* Estilo del header, que contiene el título y el menú de navegación */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #5a8dee, #94b5ff);
          padding: 1rem 2rem;
          color: white;
        }

        /* Estilo para los enlaces de navegación dentro del menú */
        nav a {
          color: white;
          margin: 0 1rem;
          text-decoration: none;
          font-weight: bold;
          position: relative;
        }

        /* Estilo para la animación de un subrayado que aparece al pasar el ratón sobre los enlaces */
        nav a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: white;
          transition: width 0.3s; /* Transición para el subrayado */
        }

        /* Activamos el subrayado cuando se pasa el ratón sobre el enlace */
        nav a:hover::after {
          width: 100%; /* El subrayado se expande por completo */
        }

        /* Animación para el desvanecimiento y deslizamiento de los elementos */
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-20px); } /* Al principio, los elementos están invisibles y desplazados */
          to   { opacity: 1; transform: translateY(0); } /* Al final, los elementos son visibles y en su posición original */
        }

        /* Clase para aplicar la animación de desvanecimiento a los elementos */
        .fade-slide {
          animation: fadeSlide 0.6s ease-out;
        }
      </style>

      <!-- Estructura del menú de navegación -->
      <header class="fade-slide">
        <!-- Título de la página -->
        <h2>AirGuard</h2>
        <!-- Menú de navegación con los enlaces -->
        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#acerca">Acerca de</a>
          <a href="#educate">Edúcate</a>
          <!-- Enlace de login, cuya funcionalidad cambiará dinámicamente -->
          <a id="login-toggle" href="#">Login</a>
        </nav>
      </header>
    `;

    // Agregamos un event listener para cambiar el texto del enlace de Login/Logout
    this.shadowRoot.querySelector('#login-toggle').addEventListener('click', () => {
      // Accedemos al enlace de login y cambiamos su texto entre 'Login' y 'Logout'
      const link = this.shadowRoot.querySelector('#login-toggle');
      link.textContent = link.textContent === 'Login' ? 'Logout' : 'Login';
    });
  }
}

// Definimos el custom element con el nombre 'main-menu'
customElements.define('main-menu', MainMenu);