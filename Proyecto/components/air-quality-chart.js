class AirQualityChart extends HTMLElement {
  constructor() {
    super();
    // Se adjunta un Shadow DOM para encapsular el estilo y la estructura del componente
    this.attachShadow({ mode: 'open' });

    // Clave de la API para acceder a los datos de la calidad del aire
    this.apiKey = 'fc0636681d157971c62ff6efcf8cce62';

    // Coordenadas geográficas de las ciudades para obtener los datos de contaminación
    this.cities = {
      Quito: { lat: -0.1807, lon: -78.4678 },
      Sangolquí: { lat: -0.3333, lon: -78.4528 },
      Guayaquil: { lat: -2.1709, lon: -79.9224 },
      Cuenca: { lat: -2.9006, lon: -79.0045 }
    };

    // Métricas de calidad del aire que se van a mostrar
    this.metrics = ['pm2_5', 'pm10', 'no2', 'o3', 'co'];

    // Etiquetas asociadas a cada métrica para mostrar en los gráficos
    this.metricLabels = {
      pm2_5: 'PM2.5 (µg/m³)',
      pm10: 'PM10 (µg/m³)',
      no2: 'NO₂ (µg/m³)',
      o3: 'O₃ (µg/m³)',
      co: 'CO (µg/m³)'
    };

    // Almacena los datos obtenidos para cada ciudad
    this.data = {};
  }

  connectedCallback() {
    // Llama a la función de renderizado y luego a la carga de datos
    this.render();
    this.loadAllData();
  }

  // Función para cargar los datos de calidad del aire de todas las ciudades
  async loadAllData() {
    const promises = Object.entries(this.cities).map(async ([city, coords]) => {
      // Realiza una solicitud a la API de OpenWeather para obtener datos de contaminación por ciudad
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}`
      );
      const json = await res.json();

      // Guarda los datos de contaminación para cada ciudad
      this.data[city] = json.list[0].components;
    });

    // Espera a que todas las solicitudes se completen antes de renderizar los gráficos
    await Promise.all(promises);
    this.renderCharts();
  }

  // Función para renderizar el HTML y la estructura inicial del componente
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilo general para la estructura */
        .container {
          font-family: Arial, sans-serif;
          padding: 1rem;
        }
        h2 {
          margin-top: 2rem;
        }

        /* Estilo para el gráfico principal */
        .main-chart {
          width: 100%;
          max-width: 600px;
          margin: auto;
        }

        /* Sección de ciudades, usa una grilla para colocar los elementos */
        .city-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        /* Estilo para los gráficos */
        canvas {
          width: 100% !important;
          height: auto !important;
        }

        /* Estilos para la tabla de cada ciudad */
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
          margin-top: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }

        th {
          background-color: #94b5ff;
          font-weight: bold;
          color: #333;
        }

        tr:nth-child(even) {
          background-color: #fafafa;
        }

        tr:hover {
          background-color: #f0f8ff;
        }

        /* Estilos para el selector de ciudad */
        select {
          display: block;
          margin: 1.5rem auto;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        select:focus {
          border-color: #007BFF;
          box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
          outline: none;
        }
      </style>

      <div class="container">
        <!-- Selector de ciudad para cambiar los datos -->
        <select id="citySelect">
          ${Object.keys(this.cities).map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
        <div class="main-chart">
          <!-- Canvas para el gráfico principal de contaminación -->
          <canvas id="polarChart"></canvas>
        </div>

        <!-- Renderiza las secciones por ciudad -->
        ${Object.keys(this.cities).map(city => `
          <h2>${city}</h2>
          <div class="city-section">
            <div><canvas id="${city}-bar"></canvas></div>
            <div><table id="${city}-table"></table></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Función para renderizar los gráficos después de que los datos hayan sido cargados
  renderCharts() {
    // Obtiene el contexto del canvas para el gráfico polar
    const ctx = this.shadowRoot.getElementById('polarChart').getContext('2d');
    const select = this.shadowRoot.getElementById('citySelect');

    // Función para actualizar el gráfico polar con los datos de la ciudad seleccionada
    const updatePolar = (city) => {
      const metrics = this.metrics.map(m => this.data[city][m]);
      // Si ya existe un gráfico polar, lo destruye antes de crear uno nuevo
      if (this.polarChart) this.polarChart.destroy();
      this.polarChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: this.metrics.map(m => this.metricLabels[m]),
          datasets: [{
            data: metrics,
            backgroundColor: ['#F94144', '#F3722C', '#F9C74F', '#90BE6D', '#577590']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Indicadores de calidad del aire en ${city}`
            }
          }
        }
      });
    };

    // Actualiza el gráfico al cambiar la ciudad seleccionada
    select.addEventListener('change', e => updatePolar(e.target.value));
    // Inicializa el gráfico con la ciudad por defecto
    updatePolar(select.value);

    // Renderiza los gráficos de barra y tablas para cada ciudad
    Object.entries(this.data).forEach(([city, values]) => {
      const barCanvas = this.shadowRoot.getElementById(`${city}-bar`);
      new Chart(barCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: this.metrics.map(m => this.metricLabels[m]),
          datasets: [{
            label: 'Nivel',
            data: this.metrics.map(m => values[m]),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Valores de contaminantes en ${city}`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Genera la tabla con los valores de calidad del aire por ciudad
      const table = this.shadowRoot.getElementById(`${city}-table`);
      table.innerHTML = `
        <thead><tr><th>Métrica</th><th>Valor</th></tr></thead>
        <tbody>
          ${this.metrics.map(m => `
            <tr><td>${this.metricLabels[m]}</td><td>${values[m]}</td></tr>
          `).join('')}
        </tbody>
      `;
    });
  }
}

// Define el nuevo elemento customizado
customElements.define('air-quality-chart', AirQualityChart);