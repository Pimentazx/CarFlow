var botaoBuscar = document.querySelector('#buscar-encomendas');

botaoBuscar.addEventListener("click", function () {
    fetch("https://pimentazx.github.io/buscarencomendas/encomendas.json")
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API:", data);
            if (data.encomendas && Array.isArray(data.encomendas)) {
                data.encomendas.forEach(adicionarEncomendaNaTabela);
            } else {
                console.error("O JSON não contém o array de encomendas esperado.");
            }
        })
        .catch(error => console.error("Erro ao carregar JSON:", error));
});


// Função para adicionar uma encomenda na tabela
function adicionarEncomendaNaTabela(encomenda) {
    var tabela = document.getElementById('tabela-encomendas').getElementsByTagName('tbody')[0];
    var novaLinha = document.createElement('tr');

    var celulaNome = document.createElement('td');
    celulaNome.textContent = encomenda.nome;
    novaLinha.appendChild(celulaNome);

    var celulaProduto = document.createElement('td');
    celulaProduto.textContent = encomenda.produto;
    novaLinha.appendChild(celulaProduto);

    var celulaQuantidade = document.createElement('td');
    celulaQuantidade.textContent = encomenda.qtde;
    novaLinha.appendChild(celulaQuantidade);

    var celulaValor = document.createElement('td');
    celulaValor.textContent = formataValor(encomenda.unit);
    novaLinha.appendChild(celulaValor);

    var celulaTotal = document.createElement('td');
    var total = Number(encomenda.qtde) * Number(encomenda.unit);
    celulaTotal.textContent = formataValor(total);
    novaLinha.appendChild(celulaTotal);

    tabela.appendChild(novaLinha);
}


// Função para formatar valores monetários
function formataValor(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para adicionar uma nova encomenda a partir do formulário
function adicionarEncomenda() {
    var nome = document.getElementById("nome").value;
    var qtde = document.getElementById("qtde").value;
    var produto = document.getElementById("produto").value;
    var unit = document.getElementById("unit").value;

    var mensagemErro = "";

    if (nome.trim() === "") {
        mensagemErro += "Por favor, preencha o campo Nome.\n";
        document.getElementById("erro-nome").innerText = "Por favor, preencha o campo Nome.";
    } else {
        document.getElementById("erro-nome").innerText = "";
    }

    if (qtde.trim() === "") {
        mensagemErro += "Por favor, preencha o campo Quantidade.\n";
        document.getElementById("erro-qtde").innerText = "Por favor, preencha o campo Quantidade.";
    } else {
        document.getElementById("erro-qtde").innerText = "";
    }

    if (produto === "") {
        mensagemErro += "Por favor, selecione um Produto.\n";
        document.getElementById("erro-produto").innerText = "Por favor, selecione um Produto.";
    } else {
        document.getElementById("erro-produto").innerText = "";
    }

    if (unit.trim() === "") {
        mensagemErro += "Por favor, preencha o campo Valor Unitário.\n";
        document.getElementById("erro-unit").innerText = "Por favor, preencha o campo Valor Unitário.";
    } else {
        document.getElementById("erro-unit").innerText = "";
    }

    if (mensagemErro !== "") {
        return;
    }

    var encomenda = {
        nome: nome,
        qtde: qtde,
        produto: produto,
        unit: unit
    };

    adicionarEncomendaNaTabela(encomenda);
}
