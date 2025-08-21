// Função para mostrar modal com roleta animada
function mostrarResultado(restaurante) {
    const modal = document.getElementById("modalResultado");
    const nomeRestaurante = document.getElementById("nomeRestaurante");
    
    const nomes = banco.map(r => r.nome);
    let i = 0;
    let speed = 50; 
    
    nomeRestaurante.classList.add("spinning");

    const spin = () => {
        nomeRestaurante.innerText = nomes[i % nomes.length];
        i++;
        speed += 20;

        if (speed < 500) {
            setTimeout(spin, speed);
        } else {
            nomeRestaurante.innerText = restaurante.nome;
            nomeRestaurante.classList.remove("spinning");
        }
    };

    spin();

    modal.style.display = "flex";

    modal.querySelector(".close").onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };
}

// --- Preenche o select de bairros dinamicamente ---
const bairroSelect = document.getElementById("bairro");
const bairrosUnicos = [...new Set(banco.flatMap(r => r.bairro))].sort();

bairrosUnicos.forEach(b => {
    const option = document.createElement("option");
    option.value = b;
    option.textContent = b;
    bairroSelect.appendChild(option);
});

// --- Evento do botão Buscar ---
document.getElementById("buscarBtn").addEventListener("click", function() {
    const horario = document.getElementById("horario").value;
    const dia = document.getElementById("dia").value;
    const bairro = document.getElementById("bairro").value;
    const takeAwayCheck = document.getElementById("takeAway").checked;
    const petFriendlyCheck = document.getElementById("petFriendly").checked;

    const resultados = banco.filter(item => {
        const filtroHorario = horario && horario !== "fullDay" ? item.horario.includes(horario) : true;
        const filtroDia = dia && dia !== "randomDay" ? item.dia.includes(dia) : true;
        const filtroBairro = bairro && bairro !== "QualquerBairro" ? item.bairro.includes(bairro) : true;
        const filtroTakeAway = !takeAwayCheck || item.takeaway;
        const filtroPetFriendly = !petFriendlyCheck || item.petFriendly;

        return filtroHorario && filtroDia && filtroBairro && filtroTakeAway && filtroPetFriendly;
    });

    if (resultados.length > 0) {
        const escolhido = resultados[Math.floor(Math.random() * resultados.length)];
        mostrarResultado(escolhido);
    } else {
        alert("Nenhum resultado encontrado.");
    }
});
