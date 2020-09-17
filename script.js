numPlayer = 2;

currentPlayer = 0;

var listCoinName = ["yellow", "red", "green", "blue"];

var playerOrder = [];

function startGame() {
    console.log('Im alive');

    var coinNumber = setGlassWaterSize()
        //waterAndGlassUp();
    setUpAddSelectPlayer();
}

function showSpinningCoin() {
    var spinningCoinDivision = document.getElementById("select_coin");

    var coin1 = document.getElementById("coin1");
    var coin2 = document.getElementById("coin2");
    var coin3 = document.getElementById("coin3");

    coin1.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";
    coin2.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";
    coin3.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";

    spinningCoinDivision.style.display = "flex";

    setTimeout(() => { coin1.src = "assets/coin/" + playerOrder[currentPlayer] + ".png" }, 800);
    setTimeout(() => { coin2.src = "assets/coin/" + playerOrder[currentPlayer] + ".png" }, 1100);
    setTimeout(() => { coin3.src = "assets/coin/" + playerOrder[currentPlayer] + ".png"; }, 1400);

    console.log(playerOrder);
}

function waterAndGlassUp() {

    var water = document.getElementById("water");
    var glass = document.getElementById("glass");

    water.classList.add('waterUp');
    glass.classList.add('glassUp');

    setTimeout(() => showSpinningCoin(), 1200);
}

function setGlassWaterSize() {
    var glass = document.getElementById("glass");
    var numberCoin = Math.floor(Math.random() * 6) + 5;
    var sizeGlass = numberCoin * 15 * 2;
    glass.style.height = (sizeGlass).toString() + "px";
    glass.style.marginTop = -sizeGlass / 2 + "px";
    return numberCoin;
}

function setUpAddSelectPlayer() {
    var selectPlayer = document.getElementById('select_number_player');
    var addBtn = document.getElementById('add');
    var removeBtn = document.getElementById('remove');
    var startBtn = document.getElementById('startBtn');
    var coinList = document.getElementById('coin_list');

    var yellow = document.createElement("img");
    var red = document.createElement("img");
    var green = document.createElement("img");
    var blue = document.createElement("img");

    yellow.src = "./assets/coin/yellow.png";
    red.src = "./assets/coin/red.png";
    green.src = "./assets/coin/green.png";
    blue.src = "./assets/coin/blue.png";

    var listObject = [yellow, red, green, blue];

    coinList.appendChild(yellow);
    coinList.appendChild(red);

    addBtn.addEventListener("click", () => {
        if (numPlayer < 4) {
            coinList.appendChild(listObject[numPlayer]);
            numPlayer++;
        }
    });

    removeBtn.addEventListener("click", () => {
        if (numPlayer > 2) {
            coinList.removeChild(listObject[numPlayer - 1]);
            numPlayer--;
        }
    });

    startBtn.addEventListener("click", () => {
        selectPlayer.style.display = "none";

        for (var i = 0; i < numPlayer; i++) {
            playerOrder.push(listCoinName[i]);
        }

        shuffle(playerOrder);

        waterAndGlassUp();
    });

    selectPlayer.style.display = "block";
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}