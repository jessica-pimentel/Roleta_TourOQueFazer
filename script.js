// Função para mostrar modal com roleta animada
function mostrarResultado(restaurante) {
    const modal = document.getElementById("modalResultado");
    const nomeRestaurante = document.getElementById("nomeRestaurante");
    const horaRestaurante = document.getElementById("horaRestaurante");
    const bairroRestaurante = document.getElementById("bairroRestaurante");
    const feriadoRestaurante = document.getElementById("feriadoRestaurante");
    const dataComemorativaRestaurante = document.getElementById("dataComemorativaRestaurante");
    const takeAwayRestaurante = document.getElementById("takeAwayRestaurante");
    const petFriendlyRestaurante = document.getElementById("petFriendlyRestaurante");
    
    // Botão de rodar novamente só aparece quando a roleta já retornou um resultado
    const rodarNovamenteBtn = document.getElementById("rodarNovamenteBtn");
    rodarNovamenteBtn.classList.add("hidden");

    // Adiciona a classe 'spinning' para aplicar o blur em todos os elementos
    nomeRestaurante.classList.add("spinning");
    horaRestaurante.classList.add("spinning");
    bairroRestaurante.classList.add("spinning");
    feriadoRestaurante.classList.add("spinning");
    dataComemorativaRestaurante.classList.add("spinning");
    takeAwayRestaurante.classList.add("spinning");
    petFriendlyRestaurante.classList.add("spinning");

    // Array com os dados para a roleta
    const nomes = banco.map(r => r.nome);
    const horas = banco.map(r => r.hora);
    const bairros = banco.map(r => r.bairro);
    const feriados = ["✅ Aceita em feriado", "❌ Não aceita em feriado"];
    const datasComemorativas = ["🎉 Aceita em data comemorativa", "❌ Não aceita em data comemorativa"];
    const takeAwayStatus = ["✅ Take away", "❌ Não tem Take away"];
    const petFriendlyStatus = ["✅ Pet friendly", "❌ Não é Pet friendly"];
    
    // Configurações da animação
    const tempoTotalRoleta = 2500;
    const intervaloRoleta = 150;

    // Função que roda a roleta
    const roleta = setInterval(() => {
        // Seleção de itens aleatórios
        const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
        const horaAleatoria = horas[Math.floor(Math.random() * horas.length)];
        const bairroAleatorio = bairros[Math.floor(Math.random() * bairros.length)];
        const feriadoAleatorio = feriados[Math.floor(Math.random() * feriados.length)];
        const dataComemorativaAleatoria = datasComemorativas[Math.floor(Math.random() * datasComemorativas.length)];
        const takeAwayAleatorio = takeAwayStatus[Math.floor(Math.random() * takeAwayStatus.length)];
        const petFriendlyAleatorio = petFriendlyStatus[Math.floor(Math.random() * petFriendlyStatus.length)];


        // Atualiza o texto dos elementos
        nomeRestaurante.innerText = nomeAleatorio;
        horaRestaurante.innerText = `Horário: ${horaAleatoria}`;
        bairroRestaurante.innerText = `Bairro: ${bairroAleatorio.join(", ")}`;
        feriadoRestaurante.innerText = feriadoAleatorio;
        dataComemorativaRestaurante.innerText = dataComemorativaAleatoria;
        takeAwayRestaurante.innerText = takeAwayAleatorio;
        petFriendlyRestaurante.innerText = petFriendlyAleatoria;

    }, intervaloRoleta);

    // Para a roleta após o tempo definido
    setTimeout(() => {
        // Para o intervalo
        clearInterval(roleta);

        // Mostra o resultado final
        nomeRestaurante.innerText = restaurante.nome;
        horaRestaurante.innerText = `Horário: ${restaurante.hora}`;
        bairroRestaurante.innerText = `Bairro: ${restaurante.bairro.join(", ")}`;
        feriadoRestaurante.innerText = restaurante.feriado ? "✅ Aceita em feriado" : "❌ Não aceita em feriado";
        dataComemorativaRestaurante.innerText = restaurante.dataComemorativa ? "🎉 Aceita em data comemorativa" : "❌ Não aceita em data comemorativa";
        takeAwayRestaurante.innerText = restaurante.takeaway ? "✅ Take away" : "❌ Não tem Take away";
        petFriendlyRestaurante.innerText = restaurante.petFriendly ? "✅ Pet friendly" : "❌ Não é Pet friendly";

        // Remove a classe 'spinning' para tirar o blur
        nomeRestaurante.classList.remove("spinning");
        horaRestaurante.classList.remove("spinning");
        bairroRestaurante.classList.remove("spinning");
        feriadoRestaurante.classList.remove("spinning");
        dataComemorativaRestaurante.classList.remove("spinning");
        takeAwayRestaurante.classList.remove("spinning");
        petFriendlyRestaurante.classList.remove("spinning");

        // Exibe o botão de rodar novamente
        rodarNovamenteBtn.classList.remove("hidden");

    }, tempoTotalRoleta);

    // Exibe o modal
    modal.style.display = "flex";

    // Eventos para fechar o modal e resetar os filtros
    modal.querySelector(".close").onclick = () => {
        modal.style.display = "none";
        resetarFiltros();
    };
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetarFiltros();
        }
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

const categoriaSelect = document.getElementById("categoria");
const categoriasUnicas = [...new Set(banco.flatMap(r => r.tipo || []))].sort();

categoriasUnicas.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    categoriaSelect.appendChild(option);
});

// --- Evento do botão Buscar ---
document.getElementById("buscarBtn").addEventListener("click", function() {
    // Referência para o elemento quando não tiver resultados para o filtro
    const noResultsMessage = document.getElementById("noResultsMessage");
    
    // Esconde a mensagem no início da busca
    noResultsMessage.classList.add("hidden");

    // Obter os valores dos inputs
    const horario = document.getElementById("horario").value;
    const dia = document.getElementById("dia").value;
    const bairro = document.getElementById("bairro").value;
    const categoria = document.getElementById("categoria").value;
    const takeAwayCheck = document.getElementById("takeAway").checked;
    const petFriendlyCheck = document.getElementById("petFriendly").checked;

    // Lógica de filtragem ajustada para arrays
    const resultados = banco.filter(item => {
        const filtroHorario = horario && horario !== "fullDay" ? item.horario.includes(horario) : true;
        const filtroDia = dia && dia !== "randomDay" ? item.dia.includes(dia) : true;
        const filtroBairro = bairro && bairro !== "QualquerBairro" ? item.bairro.includes(bairro) : true;
        const filtroCategoria = categoria && categoria !== "QualquerCategoria" ? (item.tipo && item.tipo.includes(categoria)) : true;
        const filtroTakeAway = !takeAwayCheck || item.takeaway;
        const filtroPetFriendly = !petFriendlyCheck || item.petFriendly;

        return filtroHorario && filtroDia && filtroBairro && filtroCategoria && filtroTakeAway && filtroPetFriendly;
    });

    if (resultados.length > 0) {
        const escolhido = resultados[Math.floor(Math.random() * resultados.length)];
        mostrarResultado(escolhido);
    } else {
        noResultsMessage.classList.remove("hidden");
    }
});


function mostrarRestaurante(restaurante) {
  const modal = document.getElementById("modalResultado");
  const dados = document.getElementById("dadosRestaurante");

  // mostra modal
  modal.style.display = "flex";

  // aplica blur
  dados.classList.remove("ready");
  dados.classList.add("loading");

  // reseta textos
  document.getElementById("nomeRestaurante").textContent = "";
  document.getElementById("horaRestaurante").textContent = "";
  document.getElementById("bairroRestaurante").textContent = "";
  document.getElementById("feriadoRestaurante").textContent = "";
  document.getElementById("dataComemorativaRestaurante").textContent = "";

  // simula tempo de "roleta"
  let texto = restaurante.nome;
  let i = 0;
  let intervalo = setInterval(() => {
    document.getElementById("nomeRestaurante").textContent = texto.substring(0, i) + " ▌";
    i++;
    if (i > texto.length) {
      clearInterval(intervalo);

      // preenche os outros campos
      document.getElementById("nomeRestaurante").textContent = restaurante.nome;
      document.getElementById("horaRestaurante").textContent = "⏰ " + restaurante.horario;
      document.getElementById("bairroRestaurante").textContent = "📍 " + restaurante.bairro;

      document.getElementById("feriadoRestaurante").textContent =
        restaurante.feriado ? "✅ Aceita Feriado" : "❌ Não aceita em feriado";
      document.getElementById("dataComemorativaRestaurante").textContent =
        restaurante.dataComemorativa ? "✅ Aceita em data comemorativa" : "❌ Não aceita em data comemorativa";

      // tira o blur
      dados.classList.remove("loading");
      dados.classList.add("ready");
    }
  }, 100);
}

document.getElementById("rodarNovamenteBtn").addEventListener("click", function() {
    const modal = document.getElementById("modalResultado");
    const buscarBtn = document.getElementById("buscarBtn");

    // Fecha o modal
    modal.style.display = "none";

    // Simula um clique no botão de busca para rodar a roleta novamente
    // garante que os mesmos filtros sejam aplicados ao clicar no botão "Rodar Novamente"
    buscarBtn.click();
});

document.addEventListener('DOMContentLoaded', () => {
    resetarFiltros();
});

function resetarFiltros() {
    document.getElementById("horario").value = "fullDay";
    document.getElementById("dia").value = "randomDay";
    document.getElementById("bairro").value = "QualquerBairro";
    document.getElementById("categoria").value = "QualquerCategoria";
    document.getElementById("takeAway").checked = false;
    document.getElementById("petFriendly").checked = false;
}
