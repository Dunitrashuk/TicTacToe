let symbol = 'X';
let subGameBoard = generateGameTable();
let mainGameBoard = generateGameTable();


function generateGameTable() {
    let gameTable = [];
    for(let i = 0; i < 3; i++)
        gameTable[i] = [];
    return gameTable;
}

function checkWinner(board) {

}

function draw(id) {
    let div = document.getElementById(id);

    if(div.innerHTML !== '') // check if the box is populated
        return;

    let img = document.createElement("img");  //draw image in box
    img.style.height = "40px";
    img.style.width = "40px";
    div.innerHTML = '';

    subGameBoard[parseInt(id[1])][parseInt(id[2])] = symbol;

    if(symbol === 'X') {
        symbol = 'O';
        img.src = "images/cross.png";
    } else {
        symbol = 'X';
        img.src = "images/circle.png";
    }

    div.appendChild(img);
    console.log(subGameBoard);
}

