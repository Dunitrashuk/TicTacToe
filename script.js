let player = 'X';
let subGameBoard = generateGameBoard();
let mainGameBoard = generateGameBoard();
let mainBoxesMap = {
    "00" : 0,
    "01" : 0,
    "02" : 0,
    "03" : 0,
    "04" : 0,
    "05" : 0,
    "06" : 0,
    "07" : 0,
    "08" : 0
};

function generateGameBoard() {
    let gameTable = [];
    for(let i = 0; i < 3; i++)
        gameTable[i] = [];
    return gameTable;
}

function changePlayer() {
    player === 'X' ? player = 'O' : player = 'X';
}

function checkWinner(board, player) {
    if(board[0][0] !== player && board[0][0] === board[0][1] && board[0][1] === board[0][2])
        return true;

    if(board[1][0] !== player && board[1][0] === board[1][1] && board[1][1] === board[1][2])
        return true;

    if(board[2][0] !== player && board[2][0] === board[2][1] && board[2][1] === board[2][2])
        return true;

    if(board[0][0] !== player && board[0][0] === board[1][0] && board[1][0] === board[2][0])
        return true;

    if(board[0][1] !== player && board[0][1] === board[1][1] && board[1][1] === board[2][1])
        return true;

    if(board[0][2] !== player && board[0][2] === board[1][2] && board[1][2] === board[2][2])
        return true;

    if(board[0][0] !== player && board[0][0] === board[1][1] && board[1][1] === board[2][2])
        return true;

    return board[2][0] !== player && board[2][0] === board[1][1] && board[1][1] === board[0][2];

}

function draw(id) {
    drawXO(id);
    evaluateSubGame(id);
    changePlayer();
}

function stalemate(board) {
    let cnt = 0;
    for(let i = 0; i < board.length; i++)
        for(let j = 0; j < board.length; j++){
            if(board[i][j] === 'X' || board[i][j] === 'O')
                cnt++;
        }
    return cnt === 9;
}

function evaluateSubGame(id) {
    subGameBoard[parseInt(id[1])][parseInt(id[2])] = player;
    let parent = document.getElementById(id).parentNode;

    if(checkWinner(subGameBoard)) {
        mainGameBoard[parseInt(parent.id[0])][parseInt(parent.id[1])] = player;
        parent.style.pointerEvents = "none";
        parent.style.background = "whitesmoke";

    } else if(stalemate(subGameBoard)){
        mainGameBoard[parseInt(parent.id[0])][parseInt(parent.id[1])] = '=';
        parent.style.background = "grey";
        parent.style.pointerEvents = "none";
    }
}

function drawXO(id) {
    let div = document.getElementById(id);

    if(div.innerHTML !== '') // check if the box is populated
        return;

    let img = document.createElement("img");  //draw image in box
    img.style.height = "40px";
    img.style.width = "40px";
    div.innerHTML = '';
    (player === 'X') ? img.src = "images/cross.png" : img.src = "images/circle.png";
    div.appendChild(img);
}

function lockSubGame() { //this function is responsible for removing all click events from other boxes

}






