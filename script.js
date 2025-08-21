// Função para mostrar modal com roleta animada
function mostrarResultado(restaurante) {
    const modal = document.getElementById("modalResultado");
    const nomeRestaurante = document.getElementById("nomeRestaurante");
    const horaRestaurante = document.getElementById("horaRestaurante");
    const bairroRestaurante = document.getElementById("bairroRestaurante");
    const feriadoRestaurante = document.getElementById("feriadoRestaurante");
    const dataComemorativaRestaurante = document.getElementById("dataComemorativaRestaurante");

    // botão rodar novamente só aparece quando a roleta já retornou um resultado
    const rodarNovamenteBtn = document.getElementById("rodarNovamenteBtn");
    rodarNovamenteBtn.classList.add("hidden");

    // Adiciona a classe 'spinning' para aplicar o blur
    nomeRestaurante.classList.add("spinning");
    horaRestaurante.classList.add("spinning");
    bairroRestaurante.classList.add("spinning");
    feriadoRestaurante.classList.add("spinning");
    dataComemorativaRestaurante.classList.add("spinning");

    // Para evitar que o texto final apareça na roleta
    const nomes = banco.map(r => r.nome);
    const horas = banco.map(r => r.hora);
    const bairros = banco.map(r => r.bairro);
    
    let i = 0;
    let speed = 50;

    const spin = () => {
        // Rola os nomes
        nomeRestaurante.innerText = nomes[i % nomes.length];
        
        // Rola os outros dados
        horaRestaurante.innerText = `Horário: ${horas[i % horas.length]}`;
        bairroRestaurante.innerText = `Bairro: ${bairros[i % bairros.length].join(", ")}`;
        feriadoRestaurante.innerText = banco[i % banco.length].feriado ? "✅ Aceita em feriado" : "❌ Não aceita em feriado";
        dataComemorativaRestaurante.innerText = banco[i % banco.length].dataComemorativa ? "🎉 Aceita em data comemorativa" : "❌ Não aceita em data comemorativa";

        i++;
        speed += 20;

        if (speed < 700) { // Aumentei o tempo final para o blur durar mais
            setTimeout(spin, speed);
        } else {
            // Para roleta e mostra resultado final
            nomeRestaurante.innerText = restaurante.nome;
            horaRestaurante.innerText = `Horário: ${restaurante.hora}`;
            bairroRestaurante.innerText = `Bairro: ${restaurante.bairro.join(", ")}`;
            feriadoRestaurante.innerText = restaurante.feriado ? "✅ Aceita em feriado" : "❌ Não aceita em feriado";
            dataComemorativaRestaurante.innerText = restaurante.dataComemorativa ? "🎉 Aceita em data comemorativa" : "❌ Não aceita em data comemorativa";

            // Remove a classe 'spinning' para tirar o blur
            nomeRestaurante.classList.remove("spinning");
            horaRestaurante.classList.remove("spinning");
            bairroRestaurante.classList.remove("spinning");
            feriadoRestaurante.classList.remove("spinning");
            dataComemorativaRestaurante.classList.remove("spinning");

            // Exibe o botão de rodar novamente
            rodarNovamenteBtn.classList.remove("hidden");
        }
    };

    spin();

    modal.style.display = "flex";

    // Fechar modal
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
    // Obter os valores dos inputs
    const horario = document.getElementById("horario").value;
    const dia = document.getElementById("dia").value;
    const bairro = document.getElementById("bairro").value;
    const takeAwayCheck = document.getElementById("takeAway").checked;
    const petFriendlyCheck = document.getElementById("petFriendly").checked;

    // Lógica de filtragem ajustada para arrays
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
    // Isso garante que os mesmos filtros sejam aplicados
    buscarBtn.click();
});
