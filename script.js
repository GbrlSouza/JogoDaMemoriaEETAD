const images = [
    'https://yt3.googleusercontent.com/D73QNt-9oOiqT5AnkjKvueR5tMTFe2vZtCzTgctpp8VowQSeS019UQLdg-EkavPOQcpjacYApgw=s900-c-k-c0x00ffffff-no-rj',
    'https://eetad.com.br/wp-content/uploads/2023/08/pr-terry.webp',
    'https://eetad.com.br/wp-content/uploads/2023/08/miss-doris-1.webp',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNHSDFqivoJraKnj65brrR95AnxA0Y6qquFYqRDzsgYnxvqQ295_AY1YhaK-TSwMMOcSWoif8QyWWRqc2QJu8B5ncM6Cu47whk-5MUp8sjAmDfb2yTxrHsccCEWhyphenhyphenqUR2Nq2Kt26M5pXmP/s1600/Pastor+Bernhard+Johnson+Jr..jpg',
    'https://raizespentecostais.com.br/wp-content/uploads/2025/10/Captura-de-Tela-2025-10-21-as-16.13.39-275x300.png',
    'https://raizespentecostais.com.br/wp-content/uploads/2024/10/Claudionor-de-Andreade-300x300.png'
];

let cards = [...images, ...images];
let flippedCards = [];
let matchedCards = [];
let attempts = 0;

const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('reset-btn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-back">?</div>
            <img src="${image}" alt="Carta" style="display: none;">
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        this.querySelector('img').style.display = 'block';
        this.querySelector('.card-back').style.display = 'none';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.textContent = attempts;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Parabéns! Você venceu o jogo!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.querySelector('img').style.display = 'none';
            card1.querySelector('.card-back').style.display = 'flex';

            card2.classList.remove('flipped');
            card2.querySelector('img').style.display = 'none';
            card2.querySelector('.card-back').style.display = 'flex';

            flippedCards = [];
        }, 1000);
    }
}

resetBtn.addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    createBoard();
});

createBoard();
