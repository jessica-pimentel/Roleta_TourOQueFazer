function agruparBanco(banco) {
    const agrupados = {};

    banco.forEach(restaurante => {
        const nome = restaurante.nome;

        if (!agrupados[nome]) {
            agrupados[nome] = { ...restaurante };
            agrupados[nome].hora = Array.isArray(restaurante.hora) ? [...restaurante.hora] : [restaurante.hora];
            agrupados[nome].dia = Array.isArray(restaurante.dia[0]) ? restaurante.dia.map(d => [...d]) : [restaurante.dia];
        } else {
            const novasHoras = Array.isArray(restaurante.hora) ? restaurante.hora : [restaurante.hora];
            const novosDias = Array.isArray(restaurante.dia[0]) ? restaurante.dia.map(d => [...d]) : [restaurante.dia];

            novasHoras.forEach((h, i) => {
                agrupados[nome].hora.push(h);
                agrupados[nome].dia.push(novosDias[i] || []);
            });
        }
    });

    return Object.values(agrupados);
}

// Exemplo de uso antes de filtrar ou exibir:
const bancoAgrupado = agruparBanco(banco);

// --- FUNÇÕES DE FILTRAGEM E EXIBIÇÃO DE RESULTADOS ---

/**
 * Filtra a lista de restaurantes (banco) com base nos filtros da interface.
 * @param {Array<Object>} banco O array de objetos que representa a lista completa de restaurantes.
 * @returns {Array<Object>} Um array contendo todos os restaurantes que atendem aos filtros.
 */
function filtrarRestaurantes(banco) {
    const horario = document.getElementById("horario").value;
    const dia = document.getElementById("dia").value;
    const bairro = document.getElementById("bairro").value;
    const categoria = document.getElementById("categoria").value;
    const takeAwayCheck = document.getElementById("takeAway").checked;
    const petFriendlyCheck = document.getElementById("petFriendly").checked;
    const vegetarianCheck = document.getElementById("vegetarian").checked;
    const veganCheck = document.getElementById("vegan").checked;
    const feriadoCheck = document.getElementById("feriado").checked;

    const resultadosFiltrados = banco.filter(item => {
        const filtroHorario = horario && horario !== "fullDay" ? item.horario.includes(horario) : true;
        const filtroDia = dia && dia !== "randomDay" ? item.dia.includes(dia) : true;
        const filtroBairro = bairro && bairro !== "QualquerBairro" ? item.bairro.includes(bairro) : true;
        const filtroCategoria = categoria && categoria !== "QualquerCategoria" ? (item.tipo && item.tipo.includes(categoria)) : true;
        const filtroTakeAway = !takeAwayCheck || item.takeaway;
        const filtroPetFriendly = !petFriendlyCheck || item.petFriendly;
        const filtroVegetarian = !vegetarianCheck || item.vegetarian;
        const filtroVegan = !veganCheck || item.vegan;
        const filtroFeriado = !feriadoCheck || item.feriado;

        return filtroHorario && filtroDia && filtroBairro && filtroCategoria && filtroTakeAway && filtroPetFriendly && filtroVegetarian && filtroVegan && filtroFeriado;
    });

    return resultadosFiltrados;
}

/**
 * Função auxiliar para exibir as bolinhas dos dias da semana.
 */
function mostrarDiasSemana(dias, diasSemanaContainer) {
    if (!diasSemanaContainer) return;
    diasSemanaContainer.innerHTML = '';
        const diasDaSemanaCompletos = {
        sunday: "D",
        monday: "S",
        tuesday: "T",
        wednesday: "Q",
        thursday: "Q",
        friday: "S",
        saturday: "S"
    };

    const ordemDosDias = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    ordemDosDias.forEach(dia => {
        const diaElement = document.createElement("span"); 
        diaElement.classList.add("dia-circulo");
        diaElement.innerText = diasDaSemanaCompletos[dia];

        if (dias && dias.includes(dia)) {
            diaElement.classList.add("dia-ativo"); 
        } else {
            diaElement.classList.add("dia-inativo"); 
        }

        diasSemanaContainer.appendChild(diaElement);
    });
}

/**
 * Função para mostrar o modal com roleta animada (um resultado).
 */
function mostrarResultado(restaurante) {
    const modal = document.getElementById("modalResultado");
    const dadosRestaurante = document.getElementById("dadosRestaurante");
    const listaContainer = document.getElementById("listaRestaurantesContainer");
    const modalTitle = document.getElementById("modalTitle");

    // Configura o modal para o modo Sorteio
    dadosRestaurante.style.display = 'block';
    listaContainer.style.display = 'none';
    modalTitle.textContent = '🎉 Parabéns!';

    const nomeRestaurante = document.getElementById("nomeRestaurante");
    const horaRestaurante = document.getElementById("horaRestaurante");
    const bairroRestaurante = document.getElementById("bairroRestaurante");
    const feriadoRestaurante = document.getElementById("feriadoRestaurante");
    const dataComemorativaRestaurante = document.getElementById("dataComemorativaRestaurante");
    const takeAwayRestaurante = document.getElementById("takeAwayRestaurante");
    const petFriendlyRestaurante = document.getElementById("petFriendlyRestaurante");
    const vegetarianRestaurante = document.getElementById("vegetarianRestaurante");
    const veganRestaurante = document.getElementById("veganRestaurante");
    const imagemRestaurante = document.getElementById("imagemRestaurante");
    const beneficioDescricaoRestaurante = document.getElementById("beneficioDescricaoRestaurante");
    const diasSemanaContainer = document.getElementById("dias-semana-restaurante");
    const rodarNovamenteBtn = document.getElementById("rodarNovamenteBtn");

    rodarNovamenteBtn.classList.add("hidden");

    // Adiciona a classe 'spinning' para aplicar o blur (animação de roleta)
    [beneficioDescricaoRestaurante, nomeRestaurante, horaRestaurante, bairroRestaurante, 
     feriadoRestaurante, dataComemorativaRestaurante, takeAwayRestaurante, 
     petFriendlyRestaurante, vegetarianRestaurante, veganRestaurante, diasSemanaContainer]
     .forEach(el => el.classList.add("spinning"));

    // Array com os dados para a roleta (seleção aleatória)
    const imagens = banco.map(r => r.image || "");
    const descricoes = banco.map(r => r.descricao || "sem descrição");
    const beneficios = banco.map(r => r.beneficio || "sem benefício");
    const nomes = banco.map(r => r.nome);
    const horas = banco.map(r => r.hora);
    const bairros = banco.map(r => r.bairro);
    const feriados = ["✅ Feriado", "❌ Feriado"];
    const datasComemorativas = ["✅ Data comemorativa", "❌ Data comemorativa"];
    const takeAwayStatus = ["✅ Take away", "❌ Take away"];
    const petFriendlyStatus = ["✅ Pet friendly", "❌ Pet friendly"];
    const vegetarianStatus = ["✅ Vegetariana", "❌ Vegetariana"];
    const veganStatus = ["✅ Vegana", "❌ Vegana"];
    
    const tempoTotalRoleta = 2500;
    const intervaloRoleta = 150;

    // Função que roda a roleta (apenas simula a seleção rápida)
    const roleta = setInterval(() => {
        const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
        const horaAleatoria = horas[Math.floor(Math.random() * horas.length)];
        const bairroAleatorio = bairros.flat()[Math.floor(Math.random() * bairros.flat().length)];
        const feriadoAleatorio = feriados[Math.floor(Math.random() * feriados.length)];
        const dataComemorativaAleatoria = datasComemorativas[Math.floor(Math.random() * datasComemorativas.length)];
        const takeAwayAleatorio = takeAwayStatus[Math.floor(Math.random() * takeAwayStatus.length)];
        const petFriendlyAleatorio = petFriendlyStatus[Math.floor(Math.random() * petFriendlyStatus.length)];
        const vegetarianAleatorio = vegetarianStatus[Math.floor(Math.random() * vegetarianStatus.length)];
        const veganAleatorio = veganStatus[Math.floor(Math.random() * veganStatus.length)];
        const imagemAleatoria = imagens[Math.floor(Math.random() * imagens.length)];
        const descricaoAleatorio = descricoes[Math.floor(Math.random() * descricoes.length)];
        const beneficioAleatorio = beneficios[Math.floor(Math.random() * beneficios.length)];
        
        nomeRestaurante.innerText = nomeAleatorio;
        beneficioDescricaoRestaurante.innerText = `Na compra de ${descricaoAleatorio} ${beneficioAleatorio}`;
        horaRestaurante.innerText = `Horário: ${horaAleatoria}`;
        bairroRestaurante.innerText = `Bairro: ${bairroAleatorio}`;
        feriadoRestaurante.innerText = feriadoAleatorio;
        dataComemorativaRestaurante.innerText = dataComemorativaAleatoria;
        takeAwayRestaurante.innerText = takeAwayAleatorio;
        petFriendlyRestaurante.innerText = petFriendlyAleatorio;
        vegetarianRestaurante.innerText = vegetarianAleatorio;
        veganRestaurante.innerText = veganAleatorio;
        mostrarDiasSemana(restaurante.dia, diasSemanaContainer); 

        if (imagemAleatoria) {
            imagemRestaurante.src = imagemAleatoria;
            imagemRestaurante.style.display = "block";
        } else {
            imagemRestaurante.style.display = "none";
        }
    }, intervaloRoleta);

    // Para a roleta e mostra o resultado final
    setTimeout(() => {
        clearInterval(roleta);

        // Preenche com o resultado final
        nomeRestaurante.innerText = restaurante.nome;
        beneficioDescricaoRestaurante.innerText = `Na compra de ${restaurante.descricao} ${restaurante.beneficio}`;
        horaRestaurante.innerText = `Horário: ${restaurante.hora}`;
        bairroRestaurante.innerText = `Bairro: ${restaurante.bairro.join(", ")}`;
        feriadoRestaurante.innerText = restaurante.feriado ? "✅ Feriado" : "❌ Feriado";
        dataComemorativaRestaurante.innerText = restaurante.dataComemorativa ? "✅ Data comemorativa" : "❌ Data comemorativa";
        takeAwayRestaurante.innerText = restaurante.takeaway ? "✅ Take away" : "❌ Take away";
        petFriendlyRestaurante.innerText = restaurante.petFriendly ? "✅ Pet friendly" : "❌ Pet friendly";
        vegetarianRestaurante.innerText = restaurante.vegetarian ? "✅ Vegetariana" : "❌ Vegetariana";
        veganRestaurante.innerText = restaurante.vegan ? "✅ Vegana" : "❌ Vegana";
        mostrarDiasSemana(restaurante.dia, diasSemanaContainer);

        if (restaurante.image) {
            imagemRestaurante.src = restaurante.image;
            imagemRestaurante.classList.remove("hidden-image");
        } else {
            imagemRestaurante.classList.add("hidden-image");
        }

        // Remove a classe 'spinning' para tirar o blur
        [nomeRestaurante, beneficioDescricaoRestaurante, horaRestaurante, bairroRestaurante, 
         feriadoRestaurante, dataComemorativaRestaurante, takeAwayRestaurante, 
         petFriendlyRestaurante, vegetarianRestaurante, veganRestaurante, diasSemanaContainer]
         .forEach(el => el.classList.remove("spinning"));

        rodarNovamenteBtn.classList.remove("hidden");

    }, tempoTotalRoleta);

    // Exibe o modal
    modal.style.display = "flex";

    // Eventos para fechar o modal
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

/**
 * Cria e exibe a lista de restaurantes no modal (para o botão Todos).
 */
function exibirListaRestaurantes(restaurantes) {
    const modal = document.getElementById("modalResultado");
    const listaContainer = document.getElementById("listaRestaurantesContainer");
    const dadosRestaurante = document.getElementById("dadosRestaurante");
    const modalTitle = document.getElementById("modalTitle");
    const rodarNovamenteBtn = document.getElementById("rodarNovamenteBtn");

    // Configura o modal para o modo Lista
    dadosRestaurante.style.display = 'none';
    rodarNovamenteBtn.classList.add("hidden");
    listaContainer.style.display = 'block';
    listaContainer.innerHTML = '';

    if (restaurantes.length === 0) {
        listaContainer.innerHTML = '<p class="no-results-list">Nenhum restaurante encontrado com os filtros aplicados.</p>';
        modalTitle.textContent = '❌ Sem Resultados';
    } else {
        modalTitle.textContent = `Restaurantes (${restaurantes.length})`;
        
        const ul = document.createElement('ul');
        ul.classList.add('lista-de-restaurantes');

        restaurantes.forEach(restaurante => {
            const li = document.createElement('li');
            
            // FUNÇÃO AUXILIAR PARA CRIAR O STATUS COMPLETO
            const getStatusIcon = (prop, iconTrue, iconFalse) => {
                return prop ? iconTrue : iconFalse;
            };

            // ESTRUTURA DETALHADA PARA CADA ITEM DA LISTA
            li.innerHTML = `
                <div class="restaurante-item">
                    <img src="${restaurante.image || 'placeholder.jpg'}" alt="${restaurante.nome}" class="list-item-image"/>
                    <div class="restaurante-info-list">
                        <strong>${restaurante.nome}</strong>
                        
                        <div class="location-time-info">
                            <p class="restaurante-bairro-list">📍 ${restaurante.bairro.join(', ')}</p>
                            <div class="restaurante-horarios-list">
                                ${restaurante.hora.map((h, i) => {
                                    const diasDoHorario = restaurante.dia[i] ? mostrarDiasSemana(restaurante.dia[i]) : '';
                                    return `<p>⏰ ${h}<br>      ${diasDoHorario}</p>`;
                                }).join('')}
                            </div>
                        </div>
                        
                        <p class="beneficio-lista">
                            ✨ ${restaurante.beneficio ? `Na compra de ${restaurante.descricao || 'um prato'} ${restaurante.beneficio} ` : 'Sem benefício Tour'}
                        </p>

                        <div class="status-icons">
                            <span title="Take Away">
                                ${restaurante.takeaway ? '✅ Take away' : '❌ Take away'}
                            </span>
                            <span title="Pet Friendly">
                                ${restaurante.petFriendly ? '✅ Pet friendly' : '❌ Pet friendly'}
                            </span>
                            <span title="Vegetariano">
                                ${restaurante.vegetarian ? '✅ Vegetariana' : '❌ Vegetariana'}
                            </span>
                            <span title="Vegano">
                                ${restaurante.vegan ? '✅ Vegana' : '❌ Vegana'}
                            </span>
                            <span title="Feriado">
                                ${restaurante.feriado ? '✅ Feriado' : '❌ Feriado'}
                            </span>
                             <span title="Data Comemorativa">
                                ${restaurante.dataComemorativa ? '✅ Data comemorativa' : '❌ Data comemorativa'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
            ul.appendChild(li);
        });
        listaContainer.appendChild(ul);
    }

    function mostrarDiasSemana(dias) {
        const diasDaSemanaCompletos = {
            sunday: "D",
            monday: "S",
            tuesday: "T",
            wednesday: "Q",
            thursday: "Q",
            friday: "S",
            saturday: "S"
        };

        const ordemDosDias = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        return ordemDosDias.map(dia => {
            const ativo = dias && dias.includes(dia) ? "dia-ativo" : "dia-inativo";
            return `<span class="dia-circulo-lista ${ativo}">${diasDaSemanaCompletos[dia]}</span>`;
        }).join('');
    }
    
    // Mostra o modal
    modal.style.display = "flex";

    // Reajusta o evento de fechar o modal
    const fecharModal = () => {
        modal.style.display = "none";
        dadosRestaurante.style.display = 'block'; 
        listaContainer.style.display = 'none';
        modalTitle.textContent = '🎉 Parabéns!'; 
        resetarFiltros();
    };

    modal.querySelector(".close").onclick = fecharModal;
    window.onclick = (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    };
}


// --- LÓGICA DE INICIALIZAÇÃO E EVENT LISTENERS ---

// --- Preenche os selects de bairros e categorias dinamicamente ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se 'banco' (do banco.js) está carregado
    if (typeof banco !== 'undefined' && Array.isArray(banco)) {
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
    }
    
    resetarFiltros();
});


// --- Evento do botão Sortear (#buscarBtn) ---
document.getElementById("buscarBtn").addEventListener("click", function() {
    const noResultsMessage = document.getElementById("noResultsMessage");
    noResultsMessage.classList.add("hidden");
    
    const resultados = filtrarRestaurantes(banco);

    if (resultados.length > 0) {
        const escolhido = resultados[Math.floor(Math.random() * resultados.length)];
        mostrarResultado(escolhido);
    } else {
        noResultsMessage.classList.remove("hidden");
    }
});

// --- Evento do botão Todos os restaurantes (#todosBtn) ---
document.getElementById("todosBtn").addEventListener("click", function() {
    const noResultsMessage = document.getElementById("noResultsMessage");
    noResultsMessage.classList.add("hidden");

    const bancoAgrupado = agruparBanco(banco); 
    const resultados = filtrarRestaurantes(bancoAgrupado);

    // Exibe a lista completa no modal
    exibirListaRestaurantes(resultados);
});

// --- Evento do botão Rodar Novamente ---
document.getElementById("rodarNovamenteBtn").addEventListener("click", function() {
    const modal = document.getElementById("modalResultado");
    const buscarBtn = document.getElementById("buscarBtn");

    modal.style.display = "none";
    // Simula o clique do botão de busca para reativar o sorteio com os mesmos filtros
    buscarBtn.click();
});

function resetarFiltros() {
    document.getElementById("horario").value = "fullDay";
    document.getElementById("dia").value = "randomDay";
    document.getElementById("bairro").value = "QualquerBairro";
    document.getElementById("categoria").value = "QualquerCategoria";
    document.getElementById("takeAway").checked = false;
    document.getElementById("petFriendly").checked = false;
    document.getElementById("vegetarian").checked = false;
    document.getElementById("vegan").checked = false;
    document.getElementById("feriado").checked = false;
}