const inicio = new Date("2025-09-11T00:00:00");
const hoje = new Date();
const calendario = document.getElementById("calendario");

function criarCalendario() {
  let data = new Date(inicio);

  while (data <= hoje) {
    const dia = document.createElement("div");
    dia.classList.add("dia");
    dia.innerText = data.toLocaleDateString("pt-BR");

    calendario.appendChild(dia);
    data.setDate(data.getDate() + 1);
  }
}

criarCalendario();