numPlayer = 2;

currentPlayer = 0;

var listCoinName = ["yellow", "red", "green", "blue"];

var playerOrder = [];

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



function startGame() {
    console.log('Im alive');

    var coinNumber = setGlassWaterSize()
        //waterAndGlassUp();
    setUpAddSelectPlayer();
}

function initPowerBar() {
    var back_div = document.getElementById('black_width');
    var container = document.getElementById('select_power');
    var position = 100;
    var direction = 3;
    var savedPosition = 0;

    container.style.display = "flex";

    function move() {

        position += direction;
        back_div.style.width = position.toString() + 'px';
        console.log("moved", back_div.style.width)

        if (position > 630 || position < 10 || (Math.random() > 0.99 && Math.abs((position - savedPosition) > 50))) {
            savedPosition = position;

            direction *= -1;
        }
        requestAnimationFrame(move);
    }

    move();
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

    coin1.addEventListener('click', () => {
        coin1.classList.add('coin');
        coin2.style.display = " none";
        coin3.style.display = " none";
        setTimeout(() => { reset() }, 200);
    });
    coin2.addEventListener('click', () => {
        coin2.classList.add('coin');
        coin1.style.display = " none";
        coin3.style.display = " none";
        setTimeout(() => { reset() }, 200);
    });
    coin3.addEventListener('click', () => {
        coin3.classList.add('coin');
        coin2.style.display = " none";
        coin1.style.display = " none";
        setTimeout(() => { reset() }, 200);
    });

    function reset() {
        spinningCoinDivision.style.display = "none";
        coin1.style.display = " block";
        coin2.style.display = " block";
        coin3.style.display = " block";
        initPowerBar();
    }

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