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
    var power_container = document.getElementById('power_container');
    var cursor = document.getElementById('cursor');
    cursorPosition = 0;

    var position = 100;
    var direction = 3;
    var savedPosition = 0;

    container.style.display = "flex";

    function move() {

        position += direction;
        cursorPosition += direction;
        cursor.style.marginLeft = cursorPosition.toString() + "px";

        back_div.style.width = position.toString() + 'px';

        if (position > 630 || position < 10 || (Math.random() > 0.995)) {
            savedPosition = position;

            direction *= -1;
        }
        requestAnimationFrame(move);
    }

    power_container.addEventListener("click", (event) => {
        var x = event.clientX - power_container.offsetLeft;

        console.log(x, "x")

        if (x < position || x > (position + 50 + 50 + 20 + 20 + 10 + 10 + 2)) {
            console.log('fail', position, x);
        } else if (x < position + 50 || x > (position + 50 + 20 + 20 + 10 + 10 + 2)) {
            console.log('2');
        } else if (x < position + 50 + 20 || x > (position + 50 + 20 + 10 + 10 + 2)) {
            console.log('1');
        } else if (x < position + 50 + 20 + 10 || x > (position + 50 + 20 + 10 + 2)) {
            console.log('0');
        } else {
            console.log('perfect');
        }

        cursorPosition = x + power_container.offsetLeft;

        cursor.style.marginLeft = cursorPosition.toString() + "px";
        cursor.style.marginTop = "250px";
    })

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

    setTimeout(() => { coin1.src = "assets/1/" + playerOrder[currentPlayer] + ".png" }, 800);
    setTimeout(() => { coin2.src = "assets/2/" + playerOrder[currentPlayer] + ".png" }, 1100);
    setTimeout(() => { coin3.src = "assets/3/" + playerOrder[currentPlayer] + ".png"; }, 1400);

    coin1.addEventListener('click', () => {
        coin1.classList.add('coin');
        coin2.style.height = "0px";
        coin3.style.height = "0px";
        setTimeout(() => { reset() }, 200);
    });
    coin2.addEventListener('click', () => {
        coin2.classList.add('coin');
        coin1.style.height = "0px";
        coin3.style.height = "0px";
        setTimeout(() => { reset() }, 200);
    });
    coin3.addEventListener('click', () => {
        coin3.classList.add('coin');
        coin2.style.height = "0px";
        coin1.style.height = "0px";
        setTimeout(() => { reset() }, 200);
    });

    function reset() {
        spinningCoinDivision.style.display = "none";
        coin1.style.height = "100%";
        coin2.style.height = "100%";
        coin3.style.height = "100%";
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