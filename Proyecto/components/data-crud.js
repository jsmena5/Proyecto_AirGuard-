class DataCRUD extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

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

    this.editIndex = null;
  }

  connectedCallback() {
    this.render();
  }

  addRecommendation = (e) => {
    e.preventDefault();
    const inputRec = this.shadowRoot.querySelector('#newRec');
    const inputPM25 = this.shadowRoot.querySelector('#newPM25');
    const inputPM10 = this.shadowRoot.querySelector('#newPM10');

    const recValue = inputRec.value.trim();
    const pm25Value = parseInt(inputPM25.value.trim());
    const pm10Value = parseInt(inputPM10.value.trim());

    if (recValue && !isNaN(pm25Value) && !isNaN(pm10Value)) {
      this.data.push({ recommendation: recValue, pm25: pm25Value, pm10: pm10Value });
      inputRec.value = '';
      inputPM25.value = '';
      inputPM10.value = '';
      this.render();
    } else {
      alert('Por favor ingresa valores válidos para la recomendación y los niveles de PM2.5 y PM10.');
    }
  }

  deleteRecommendation = (index) => {
    this.data.splice(index, 1);
    this.render();
  }

  openEditModal = (index) => {
    this.editIndex = index;
    const item = this.data[index];
    const modal = this.shadowRoot.querySelector('#modal');
    modal.style.display = 'flex';
    this.shadowRoot.querySelector('#editRec').value = item.recommendation;
    this.shadowRoot.querySelector('#editPM25').value = item.pm25;
    this.shadowRoot.querySelector('#editPM10').value = item.pm10;
  }

  closeModal = () => {
    this.shadowRoot.querySelector('#modal').style.display = 'none';
  }

  saveEdit = (e) => {
    e.preventDefault();
    const rec = this.shadowRoot.querySelector('#editRec').value.trim();
    const pm25 = parseInt(this.shadowRoot.querySelector('#editPM25').value.trim());
    const pm10 = parseInt(this.shadowRoot.querySelector('#editPM10').value.trim());

    if (rec && !isNaN(pm25) && !isNaN(pm10)) {
      this.data[this.editIndex] = { recommendation: rec, pm25, pm10 };
      this.closeModal();
      this.render();
    } else {
      alert('Por favor ingresa valores válidos para editar.');
    }
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        h3 {
          text-align: center;
          color: #333;
        }

        form {
          background: linear-gradient(145deg, #e0f7fa, #ffffff);
          border-radius: 20px;
          padding: 20px;
          width: 320px;
          margin: 20px auto;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }

        input, button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          font-size: 14px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        button {
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button[type="submit"] {
          background-color: #4caf50;
          color: white;
          border: none;
        }

        table {
          width: 90%;
          margin: 20px auto;
          border-collapse: collapse;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #eee;
          text-align: center;
        }

        th {
          background: #009688;
          color: white;
        }

        button.delete {
          background: #e53935;
          color: white;
          margin-right: 5px;
        }

        button.edit {
          background: #fdd835;
          color: black;
        }

        #addNewRecButton {
          background-color: #03a9f4;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          margin: 10px auto;
          display: block;
        }

        /* Modal */
        #modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.6);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        #modalContent {
          background: white;
          padding: 25px;
          border-radius: 15px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
          position: relative;
        }

        #modalContent h4 {
          margin-top: 0;
          margin-bottom: 15px;
          text-align: center;
        }

        #modalContent button.close {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: crimson;
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 14px;
          width: 28px;
          height: 28px;
        }
      </style>

      <h3>Gestión de Recomendaciones</h3>
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
            <th>PM2.5</th>
            <th>PM10</th>
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
                <button class="delete" data-index="${i}">Eliminar</button>
                <button class="edit" data-index="${i}">Editar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div id="modal">
        <div id="modalContent">
          <button class="close" id="closeModal">×</button>
          <h4>Editar Recomendación</h4>
          <form id="editForm">
            <input id="editRec" type="text" placeholder="Recomendación" required />
            <input id="editPM25" type="number" placeholder="PM2.5" required />
            <input id="editPM10" type="number" placeholder="PM10" required />
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#form').addEventListener('submit', this.addRecommendation);
    this.shadowRoot.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => this.deleteRecommendation(btn.dataset.index));
    });
    this.shadowRoot.querySelectorAll('.edit').forEach(btn => {
      btn.addEventListener('click', () => this.openEditModal(btn.dataset.index));
    });

    this.shadowRoot.querySelector('#editForm').addEventListener('submit', this.saveEdit);
    this.shadowRoot.querySelector('#closeModal').addEventListener('click', this.closeModal);
    this.shadowRoot.querySelector('#addNewRecButton').addEventListener('click', () => {
      this.shadowRoot.querySelector('#newRec').value = '';
      this.shadowRoot.querySelector('#newPM25').value = '';
      this.shadowRoot.querySelector('#newPM10').value = '';
    });
  }
}

customElements.define('data-crud', DataCRUD);