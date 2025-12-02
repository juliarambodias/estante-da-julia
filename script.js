const cardContainer = document.querySelector('.card-container');
const campoBusca = document.querySelector('#campo-busca');
let livros = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        livros = data.livros;
    })
    .catch(error => console.error('Erro ao carregar os livros:', error));

function inciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    document.body.classList.add('conteudo-visivel'); // Deixa o fundo mais transparente
    cardContainer.innerHTML = '';
    let resultados = [];
 
    if (termoBusca.trim() === '') {
        resultados = livros; // Mostra todos os livros se a busca estiver vazia
    } else {
        resultados = livros.filter(livro =>
            livro.titulo.toLowerCase().includes(termoBusca) ||
            livro.autor.toLowerCase().includes(termoBusca)
        );
    }
    renderizarResultados(resultados);
}

function resetarPagina() {
    cardContainer.innerHTML = '';
    campoBusca.value = '';
    document.body.classList.remove('conteudo-visivel'); // Restaura a opacidade do fundo
}

function mostrarRecomendacoes() {
    document.body.classList.add('conteudo-visivel');
    const favoritos = livros.filter(livro => livro.recomendado);
    renderizarResultados(favoritos, 'Você ainda não marcou nenhum livro como favorito.');
}

function renderizarResultados(resultados, mensagemVazio = 'Nenhum livro encontrado.') {
    cardContainer.innerHTML = '';
    if (resultados.length === 0) {
        cardContainer.innerHTML = `<p class="nenhum-resultado">${mensagemVazio}</p>`;
    } else {
        resultados.forEach(livro => {
            const card = document.createElement('div');
            card.classList.add('card');
            if (livro.recomendado) {
                card.classList.add('card-favorito');
            }

            const estrela = livro.recomendado ? '<span class="estrela-favorito">★</span>' : '';
            let conteudoCard = `
                <div class="card-content">
                    <h3>${livro.titulo} ${estrela}</h3>
                    <h4>${livro.autor}</h4>
                    <h5>${livro.genero}</h5>
                    <p>${livro.descricao}</p>
                </div>
            `;

            if (livro.imagem) {
                card.innerHTML = `
                    <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}" class="card-image">
                ` + conteudoCard;
            } else {
                card.innerHTML = conteudoCard;
            }

            cardContainer.appendChild(card);
        });
    }
}

function enviarRecomendacao() {
    const titulo = document.getElementById('rec-titulo').value;
    const autor = document.getElementById('rec-autor').value;

    if (titulo && autor) {
        alert(`Obrigada pela sua recomendação!\nTítulo: ${titulo}\nAutor: ${autor}`);
        document.getElementById('rec-titulo').value = '';
        document.getElementById('rec-autor').value = '';
    } else {
        alert('Por favor, preencha o título e o autor do livro.');
    }
}