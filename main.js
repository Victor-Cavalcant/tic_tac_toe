const play = (() => {
    const cellEl = document.querySelectorAll(".cell");
    const turnEl = document.querySelector(".turn");
    const resultEl = document.querySelector(".result");

    let player = "X";
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        const board = [];
        cellEl.forEach((cell) => board.push(cell.textContent));

        const winner = winningCombinations.map(([a, b, c]) => {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
            return null;
        }).find((result) => result !== null);

        if (winner) {
            return winner;
        }

        if (board.every((cell) => cell !== '')) {
            return 'Tie';
        }

        return null;
    };

    const renderResult = (winner) => {
        if (winner === 'Tie') {
            resultEl.textContent = "It's a Tie!";
        } else {
            resultEl.textContent = `${winner} Wins!`;
        }
        turnEl.textContent = "";
        gameActive = false;
    };

    cellEl.forEach((div) => {
        div.addEventListener('click', () => {
            if (div.textContent === '' && gameActive) {
                div.textContent = player;
                const winner = checkWinner();
                if (winner) {
                    renderResult(winner);
                } else {
                    player = player === "X" ? "O" : "X";
                    turnEl.textContent = `Turn: ${player}`;
                }
            }
        });
    });

    const playAgain = document.getElementById("playAgainBtn");

    playAgain.addEventListener('click', () => {
        cellEl.forEach((div) => (div.textContent = ''));
        turnEl.textContent = "Turn: X";
        resultEl.textContent = '';
        player = "X";
        gameActive = true;
    });
})();
