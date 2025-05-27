// Definimos un nuevo elemento personalizado llamado 'about-section'
customElements.define('about-section', class extends HTMLElement { 
  // Constructor de la clase, se ejecuta cuando se crea una instancia del componente
  constructor() {
    super();
    // Adjuntamos un Shadow DOM con modo 'open' (permitiendo acceso desde fuera)
    this.attachShadow({ mode: 'open' });
  }

  // Método que se ejecuta cuando el componente es agregado al DOM
  connectedCallback() {
    // Definimos el contenido interno del componente, que incluye estilos y estructura HTML
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos del componente */
        :host {
          display: block;  /* Hace que el componente sea un bloque (ocupa toda la línea) */
          font-family: 'Segoe UI', sans-serif;  /* Fuente para el texto */
          padding: 2rem;  /* Espaciado interno */
          background: #f4f7fa;  /* Fondo color claro */
          border-radius: 12px;  /* Bordes redondeados */
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);  /* Sombra sutil alrededor */
          animation: fadeIn 0.4s ease-in;  /* Animación de entrada */
        }

        h2 {
          color: #333;  /* Color del título */
          font-size: 1.8rem;  /* Tamaño del título */
          margin-bottom: 1rem;  /* Espaciado debajo del título */
        }

        ul {
          list-style: none;  /* Eliminamos los puntos de la lista */
          padding: 0;  /* Eliminamos el padding del <ul> */
        }

        li {
          background: #fff;  /* Fondo blanco para los ítems de la lista */
          margin-bottom: 0.75rem;  /* Espaciado entre los ítems */
          padding: 1rem;  /* Relleno de cada ítem */
          border-radius: 10px;  /* Bordes redondeados para cada ítem */
          box-shadow: 2px 2px 6px #d9e0ea, -2px -2px 6px #ffffff;  /* Sombra suave para los ítems */
          transition: transform 0.3s ease;  /* Efecto de transición al pasar el ratón */
        }

        li:hover {
          transform: translateY(-3px);  /* Efecto de movimiento hacia arriba cuando el ratón pasa por encima */
        }

        /* Definimos la animación 'fadeIn' para que el componente se desplace desde abajo */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }  /* Empieza invisible y ligeramente abajo */
          to   { opacity: 1; transform: translateY(0); }    /* Termina completamente visible en su posición original */
        }
      </style>

      <!-- Estructura del contenido del componente -->
      <h2>Acerca del equipo</h2>
      <p>Somos un equipo comprometido con el desarrollo tecnológico y ambiental. Integrantes:</p>
      <ul>
        <!-- Lista de integrantes del equipo -->
        <li>Mateo Colina</li>
        <li>James Mena</li>
        <li>Oscar Chanataxi</li>
      </ul>
    `;
  }
});