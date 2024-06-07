let matrix = Array.from(Array(3), () => new Array(3).fill(" "));
console.log("Player 1: X");
console.log("Player 2: O");
let turn = true;
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let index = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

const printBoard = () => {
    console.log("_ ___ _ ___ _ ___ _");
    console.log("| " + matrix[0][0], "  | ", matrix[0][1], " | ", matrix[0][2], " |");
    console.log("_ ___ _ ___ _ ___ _");
    console.log("| " + matrix[1][0], "  | ", matrix[1][1], " | ", matrix[1][2], " |");
    console.log("_ ___ _ ___ _ ___ _");
    console.log("| " + matrix[2][0], "  | ", matrix[2][1], " | ", matrix[2][2], " |");
    console.log("_ ___ _ ___ _ ___ _");
};

const checkWin = () => {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== " ") return true;
        if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== " ") return true;
    }
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== " ") return true;
    if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== " ") return true;
    return false;
};

const askQuestion = (query) => {
    return new Promise((resolve) => r1.question(query, resolve));
};

const main = async () => {
    while (true) {
        printBoard();
        let player = turn ? "Player 1" : "Player 2";
        console.log(`${player}, choose the number to put your symbol at that place`);
        
        let input = await askQuestion('Your choice: ');
        input = Number(input);
        
        if (input < 1 || input > 9 || matrix[index[input - 1][0]][index[input - 1][1]] !== " ") {
            console.log("Invalid move. Try again.");
            continue;
        }

        matrix[index[input - 1][0]][index[input - 1][1]] = turn ? "X" : "O";
        
        if (checkWin()) {
            printBoard();
            console.log(`${player} wins!`);
            break;
        }
        
        turn = !turn;
    }
    r1.close();
};

main();
