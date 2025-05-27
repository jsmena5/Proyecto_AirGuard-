class DataCRUD extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Datos iniciales
    this.data = [
      { recommendation: "Evita actividad física intensa cuando los niveles de PM2.5 sean altos", pm25: 35, pm10: 60 },
      { recommendation: "Cierra las ventanas en días de alta contaminación", pm25: 50, pm10: 80 },
      { recommendation: "Revisa la calidad del aire antes de salir al exterior", pm25: 40, pm10: 70 },
      { recommendation: "Usa mascarillas en días con alta contaminación", pm25: 45, pm10: 75 },
      { recommendation: "Limita el tiempo de exposición a la contaminación del aire", pm25: 60, pm10: 90 },
      { recommendation: "Mantén los sistemas de ventilación en buen estado", pm25: 30, pm10: 50 },
      { recommendation: "Consulta la calidad del aire en tiempo real", pm25: 55, pm10: 85 },
      { recommendation: "Evita hacer ejercicio al aire libre cuando los niveles de PM2.5 superen los 100", pm25: 100, pm10: 120 },
      { recommendation: "Asegúrate de que tu hogar esté bien ventilado", pm25: 25, pm10: 40 },
      { recommendation: "Si tienes condiciones respiratorias, evita áreas con alta contaminación", pm25: 70, pm10: 100 }
    ];
  }

  connectedCallback() {
    this.render();
  }

  // Agregar nueva recomendación
  addRecommendation = (e) => {
    e.preventDefault();
    const inputRec = this.shadowRoot.querySelector('#newRec');
    const inputPM25 = this.shadowRoot.querySelector('#newPM25');
    const inputPM10 = this.shadowRoot.querySelector('#newPM10');
    const editMsg = this.shadowRoot.querySelector('#editMessage');

    const recValue = inputRec.value.trim();
    const pm25Value = parseInt(inputPM25.value.trim());
    const pm10Value = parseInt(inputPM10.value.trim());

    if (recValue && !isNaN(pm25Value) && !isNaN(pm10Value)) {
      this.data.push({ recommendation: recValue, pm25: pm25Value, pm10: pm10Value });
      inputRec.value = '';
      inputPM25.value = '';
      inputPM10.value = '';
      editMsg.style.display = 'none'; // Ocultar mensaje de edición
      this.render();
    } else {
      alert('Por favor ingresa valores válidos para la recomendación y los niveles de PM2.5 y PM10.');
    }
  }

  // Eliminar recomendación
  deleteRecommendation = (index) => {
    this.data.splice(index, 1);
    this.render();
  }

  // Editar recomendación
  editRecommendation = (index) => {
    const inputRec = this.shadowRoot.querySelector('#newRec');
    const inputPM25 = this.shadowRoot.querySelector('#newPM25');
    const inputPM10 = this.shadowRoot.querySelector('#newPM10');
    const editMsg = this.shadowRoot.querySelector('#editMessage');

    inputRec.value = this.data[index].recommendation;
    inputPM25.value = this.data[index].pm25;
    inputPM10.value = this.data[index].pm10;

    const form = this.shadowRoot.querySelector('#form');
    form.scrollIntoView();

    editMsg.style.display = 'block'; // Mostrar mensaje de edición
    editMsg.textContent = `Editando: ${this.data[index].recommendation}`; // Mostrar recomendación editada
  }

  // Renderizar componente
  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        input, button {
          padding: 10px;
          margin-top: 10px;
          border: none;
          font-size: 14px;
        }

        button {
          cursor: pointer;
        }

        button.delete {
          background: darkred;
          color: white;
          border-radius: 5px;
        }

        button.edit {
          background: yellow;
          color: black;
          border-radius: 5px;
          margin-left: 5px;
        }

        h3 {
          font-weight: bold;
          color: black;
          text-align: center;
          margin-top: 10px;
        }

        form {
          background: linear-gradient(145deg, #b0e0e6, #ffffff);
          border-radius: 25px;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 300px;
          margin: auto;
        }

        input[type="text"], input[type="number"] {
          width: 100%;
          border-radius: 20px;
          padding: 10px;
          margin-bottom: 10px;
          border: 2px solid #aaa;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #007bff;
          background-color: #f0f8ff;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ddd;
        }

        th {
          background-color: #f0f8ff;
        }

        td:nth-child(odd) {
          background-color: #cce7ff;
        }

        td:nth-child(even) {
          background-color: #e0f7fa;
        }

        #editMessage {
          background-color: black;
          color: yellow;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          padding: 15px;
          margin: 10px auto;
          border-radius: 10px;
          width: 90%;
          display: none;
        }

        /* Estilo del botón Nueva recomendación */
        #addNewRecButton {
          background-color: #00bfff; /* Celeste */
          border: 2px solid black;
          color: black;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        #addNewRecButton:hover {
          background-color: #009acd; /* Celeste oscuro al pasar el mouse */
        }
      </style>
      
      <h3>Gestión de Recomendaciones</h3>
      <div id="editMessage">USTED ESTÁ EDITANDO</div>
      
      <button id="addNewRecButton">Nueva recomendación</button>
      
      <form id="form">
        <input id="newRec" type="text" placeholder="Nueva recomendación" required />
        <input id="newPM25" type="number" placeholder="Valor PM2.5" required />
        <input id="newPM10" type="number" placeholder="Valor PM10" required />
        <button type="submit">Agregar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Recomendación</th>
            <th>Valor PM2.5</th>
            <th>Valor PM10</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((item, i) => `
            <tr>
              <td>${item.recommendation}</td>
              <td>${item.pm25}</td>
              <td>${item.pm10}</td>
              <td>
                <button data-index="${i}" class="delete">Eliminar</button>
                <button data-index="${i}" class="edit">Editar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Listeners
    this.shadowRoot.querySelector('#form').addEventListener('submit', this.addRecommendation);

    this.shadowRoot.querySelectorAll('button.delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.deleteRecommendation(index);
      });
    });

    this.shadowRoot.querySelectorAll('button.edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.editRecommendation(index);
      });
    });

    this.shadowRoot.querySelector('#addNewRecButton').addEventListener('click', () => {
      // Al hacer clic en el botón, vaciar el formulario
      this.shadowRoot.querySelector('#newRec').value = '';
      this.shadowRoot.querySelector('#newPM25').value = '';
      this.shadowRoot.querySelector('#newPM10').value = '';
      this.shadowRoot.querySelector('#editMessage').style.display = 'none';
    });
  }
}

customElements.define('data-crud', DataCRUD);