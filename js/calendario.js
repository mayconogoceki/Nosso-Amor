document.addEventListener("DOMContentLoaded", () => {
    const dataInicio = new Date("2025-09-11T00:00:00");
    const hoje = new Date();

    function atualizarPainel() {
        const agora = new Date();
        const diff = agora - dataInicio;
        
        // Atualiza os stats cards
        if(document.getElementById("stat-horas")) {
            document.getElementById("stat-horas").innerText = Math.floor(diff / (1000 * 60 * 60)).toLocaleString();
        }
        if(document.getElementById("stat-beijos")) {
            document.getElementById("stat-beijos").innerText = Math.floor(diff / (1000 * 60 * 60 * 2)).toLocaleString();
        }

        // Atualiza o relógio digital preciso
        if(document.getElementById("live-dias")) {
            document.getElementById("live-dias").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById("live-horas").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            document.getElementById("live-min").innerText = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
            document.getElementById("live-seg").innerText = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        }
    }

    function gerarTodosOsMeses() {
        const container = document.getElementById("todos-os-calendarios");
        if(!container) return;

        container.innerHTML = "";
        let dataLoop = new Date(dataInicio.getFullYear(), dataInicio.getMonth(), 1);
        let dataFim = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

        while (dataLoop <= dataFim) {
            const mesAtualLoop = dataLoop.getMonth();
            const anoAtualLoop = dataLoop.getFullYear();
            const nomeMes = dataLoop.toLocaleString('pt-BR', { month: 'long' });
            
            const wrapper = document.createElement("div");
            wrapper.className = "calendar-wrapper";
            wrapper.innerHTML = `
                <div class="calendar-header-black"><h3>${nomeMes.toUpperCase()} ${anoAtualLoop}</h3></div>
                <table class="calendar-table">
                    <thead><tr><th>DOM</th><th>SEG</th><th>TER</th><th>QUA</th><th>QUI</th><th>SEX</th><th>SÁB</th></tr></thead>
                    <tbody></tbody>
                </table>
            `;

            const tbody = wrapper.querySelector("tbody");
            const ultimoDiaMes = new Date(anoAtualLoop, mesAtualLoop + 1, 0).getDate();
            const diaSemanaInicia = new Date(anoAtualLoop, mesAtualLoop, 1).getDay();

            let diaContador = 1;
            for (let i = 0; i < 6; i++) {
                let tr = document.createElement("tr");
                for (let j = 0; j < 7; j++) {
                    let td = document.createElement("td");
                    
                    // Lógica para esconder dias antes do início do namoro (11/09/2025)
                    const ehSetembro25 = (anoAtualLoop === 2025 && mesAtualLoop === 8);
                    const deveEsconderPorData = (ehSetembro25 && diaContador < 11);

                    if ((i === 0 && j < diaSemanaInicia) || diaContador > ultimoDiaMes || deveEsconderPorData) {
                        td.className = "empty";
                        if (deveEsconderPorData) diaContador++; 
                    } else {
                        td.innerText = diaContador;
                        const dataVerificar = new Date(anoAtualLoop, mesAtualLoop, diaContador);
                        const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                        
                        if (dataVerificar < hojeSemHora) td.classList.add("passado");
                        if (diaContador === 11) td.classList.add("especial");
                        
                        diaContador++;
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                if (diaContador > ultimoDiaMes) break;
            }
            container.appendChild(wrapper);
            dataLoop.setMonth(dataLoop.getMonth() + 1);
        }
    }

    gerarTodosOsMeses();
    setInterval(atualizarPainel, 1000);
    atualizarPainel();
});