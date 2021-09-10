let player = 'X';
let currentMainBox;
let prevMainBox = 0;
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

function checkWinner(board) {
    if(board[0][0] !== undefined && board[0][0] === board[0][1] && board[0][1] === board[0][2])
        return true;

    if(board[1][0] !== undefined && board[1][0] === board[1][1] && board[1][1] === board[1][2])
        return true;

    if(board[2][0] !== undefined && board[2][0] === board[2][1] && board[2][1] === board[2][2])
        return true;

    if(board[0][0] !==undefined && board[0][0] === board[1][0] && board[1][0] === board[2][0])
        return true;

    if(board[0][1] !== undefined && board[0][1] === board[1][1] && board[1][1] === board[2][1])
        return true;

    if(board[0][2] !== undefined && board[0][2] === board[1][2] && board[1][2] === board[2][2])
        return true;

    if(board[0][0] !== undefined && board[0][0] === board[1][1] && board[1][1] === board[2][2])
        return true;

    return (board[2][0] !== undefined && board[2][0] === board[1][1] && board[1][1] === board[0][2]);

}

function draw(id) {
    drawXO(id, 0,"40px", "40px");
    evaluateSubGame(id);
    evaluateMainGame();
    changePlayer();
}

function stalemate(board) {
    let cnt = 0;
    for(let i = 0; i < board.length; i++)
        for(let j = 0; j < board.length; j++){
            if(board[i][j] === 'X' || board[i][j] === 'O' || board[i][j] === '=')
                cnt++;
        }
    return cnt === 9;
}

function evaluateSubGame(id) {
    let parent = document.getElementById(id).parentNode;
    currentMainBox = parent.id;

    if(currentMainBox !== prevMainBox){
        subGameBoard = generateGameBoard();
        prevMainBox = currentMainBox;
    }

    lockSubGame(parent);
    subGameBoard[parseInt(id[1])][parseInt(id[2])] = player;

    if(checkWinner(subGameBoard)) {
        mainGameBoard[parseInt(parent.id[0])][parseInt(parent.id[1])] = player;
        addCss(parent, 1);
        unlockSubGame();

    } else if(stalemate(subGameBoard)){
        mainGameBoard[parseInt(parent.id[0])][parseInt(parent.id[1])] = '=';
        addCss(parent, 2);
        unlockSubGame();
    }
    console.log(subGameBoard);
}

function drawXO(id, flag, height, width) {
    let div = document.getElementById(id);

    if(div.innerHTML !== '' && flag === 0) // check if the box is populated
        return;

    div.style.pointerEvents = "none";
    let img = document.createElement("img");  //draw image in box
    img.style.height = height;
    img.style.width = width;
    div.innerHTML = '';
    (player === 'X') ? img.src = "images/cross.png" : img.src = "images/circle.png";

    if(flag === 2) {
        img.src = "images/equal.png";
    }
    div.appendChild(img);
}

function addCss(parent, flag) {
    parent.style.pointerEvents = "none";
    parent.style.display = "flex";
    parent.style.alignItems = "center";
    parent.style.justifyContent = "center";
    parent.style.background = "white";
    drawXO(currentMainBox, flag,"120px", "120px");
}

function lockSubGame(current) { //this function is responsible for removing all click events from other boxes
    let box;
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++) {
            box = document.getElementById(String(i) + String(j));
            if(box.id === current.id){
                mainBoxesMap[current.id] = 1;
                continue;
            }

            box.style.pointerEvents = "none";
        }
}

function unlockSubGame() {
    let box;
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++) {
            box = document.getElementById(String(i) + String(j));
            if(mainBoxesMap[box.id] === 1) {
                continue;
            }
            box.style.pointerEvents = "";
        }
}

function evaluateMainGame() {
    if(checkWinner(mainGameBoard)){
        lockSubGame(currentMainBox);
        console.log(player);
    } else if(stalemate(mainGameBoard))
        console.log(checkSpecialWinner(mainGameBoard));
}

function checkSpecialWinner(board) {
    let X = 0;
    let O = 0;

    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === 'X')
                X++;

            if(board[i][j] === 'O')
                O++;
        }

    if(X > O)
        return "X";
    if(O > X)
        return "O";
    if(X === O)
        return "=";
}






