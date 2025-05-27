📘 Documentación Técnica: Shadow DOM y Custom Elements en AirGuard
🌐 ¿Qué es un Custom Element?
En el proyecto AirGuard, utilizamos Custom Elements para encapsular y reutilizar componentes de interfaz, como el menú lateral de navegación (<nav-sidebar>), siguiendo el estándar de Web Components. Esto permite crear elementos HTML personalizados con su propio comportamiento, estilo y estructura.
Por ejemplo, el componente NavSidebar está definido como:
customElements.define('nav-sidebar', NavSidebar);
Esto permite que en cualquier parte del HTML se pueda usar simplemente:
<nav-sidebar></nav-sidebar>
🛡 ¿Qué es el Shadow DOM y por qué se usa?
El Shadow DOM es una tecnología que permite encapsular la estructura y los estilos de un componente, evitando conflictos con el CSS global de la página.
En AirGuard, se implementa mediante:
this.attachShadow({ mode: 'open' });
Esto crea una raíz de Shadow DOM en modo "abierto", permitiendo que el contenido y estilos definidos dentro del componente no se vean afectados por el exterior, ni interfieran con él.
✅ Beneficios en AirGuard
•	Encapsulamiento Total: El estilo del menú lateral no se ve alterado por otras hojas de estilo de la aplicación.
•	Reutilización Segura: Podemos usar múltiples instancias del componente sin que se sobreescriban estilos entre sí.
•	Mantenibilidad: Cada componente está aislado, facilitando la depuración y evolución del sistema.
📦 Ejemplo Integrado
export class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Shadow DOM
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos encapsulados */
      </style>
      <div class="sidebar-title">Menú Navegación</div>
      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#recomendaciones">Recomendaciones</a>
      </nav>
    `;
  }
}

customElements.define('nav-sidebar', NavSidebar); // Custom Element
🔧 Conclusión
Gracias a los Web Components, AirGuard implementa una interfaz modular, escalable y robusta. El uso del Shadow DOM garantiza que cada parte del sistema sea independiente y evite errores comunes de estilo en aplicaciones grandes.