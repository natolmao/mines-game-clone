// script.js
document.addEventListener('DOMContentLoaded', () => {
    const betAmountInput = document.getElementById('bet-amount');
    const numberOfMinesInput = document.getElementById('number-of-mines');
    const startGameBtn = document.getElementById('start-game-btn');
    const gridContainer = document.querySelector('.grid-container');
    const profitElement = document.getElementById('profit');
    const winsElement = document.getElementById('wins');
    const wageredElement = document.getElementById('wagered');
    const lossesElement = document.getElementById('losses');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const closeBtn = document.querySelector('.close');

    let gameInProgress = false;
    let betAmount = 0;
    let numberOfMines = 0;
    let profit = 0;
    let wins = 0;
    let wagered = 0;
    let losses = 0;

    startGameBtn.addEventListener('click', startGame);
    closeBtn.addEventListener('click', () => popup.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    function startGame() {
        betAmount = parseFloat(betAmountInput.value);
        numberOfMines = parseInt(numberOfMinesInput.value);
        if (isNaN(betAmount) || isNaN(numberOfMines) || betAmount <= 0 || numberOfMines <= 0) {
            alert('Please enter valid bet amount and number of mines.');
            return;
        }
        gameInProgress = true;
        gridContainer.innerHTML = '';
        for (let i = 0; i < 25; i++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-item');
            tile.addEventListener('click', () => clickTile(tile));
            gridContainer.appendChild(tile);
        }
        profit = 0;
        updateStats();
    }

    function clickTile(tile) {
        if (!gameInProgress || tile.classList.contains('clicked')) return;
        tile.classList.add('clicked');
        // Simplified game logic: randomly determine if clicked tile is a mine
        if (Math.random() < numberOfMines / 25) {
            // Hit a mine
            gameInProgress = false;
            losses += betAmount;
            showPopup(`You hit a mine! You lost $${betAmount.toFixed(2)}.`);
        } else {
            // Hit a gem
            profit += betAmount * 0.1; // Example profit calculation
            updateStats();
        }
    }

    function updateStats() {
        profitElement.textContent = `Profit: $${profit.toFixed(2)}`;
        winsElement.textContent = `Wins: ${wins}`;
        wageredElement.textContent = `Wagered: $${wagered.toFixed(2)}`;
        lossesElement.textContent = `Losses: $${losses.toFixed(2)}`;
    }

    function showPopup(message) {
        popupContent.textContent = message;
        popup.style.display = 'block';
    }
});
