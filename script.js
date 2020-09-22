numPlayer = 2;

currentPlayer = 0;

var listCoinName = ["yellow", "red", "green", "blue"];

var playerOrder = [];

var marginVal = 0;

coinWidth = 15;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



function startGame() {
    console.log('Im alive');

    var coinNumber = setGlassWaterSize()

    console.log(coinNumber, "coinNumber");
    //waterAndGlassUp();
    setUpAddSelectPlayer();
}

function initPowerBar(coinNb) {
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

    power_container.addEventListener("mousedown", (event) => {
        var x = event.clientX - power_container.offsetLeft;
        cursor.style.display = "block";

        console.log(x, "x")

        if (x < position || x > (position + 50 + 50 + 20 + 20 + 10 + 10 + 2)) {
            displayResult(3);
        } else if (x < position + 50 || x > (position + 50 + 20 + 20 + 10 + 10 + 2)) {
            displayResult(2);
        } else if (x < position + 50 + 20 || x > (position + 50 + 20 + 10 + 10 + 2)) {
            displayResult(1);
        } else if (x < position + 50 + 20 + 10 || x > (position + 50 + 20 + 10 + 2)) {
            displayResult(0);
        } else {
            displayResult(-1);
        }

        cursorPosition = x + power_container.offsetLeft;

        cursor.style.marginLeft = cursorPosition.toString() + "px";
    })

    function displayResult(val) {
        setTimeout(() => {
            cursor.style.display = "none";
            container.style.display = "none";
            dropCoin(val, coinNb);
        }, 300);

    }

    move();
}

async function dropCoin(value, coinNb) {
    var marginValues = [0.40, 0.30, 0.10, 0.05];
    var glassDiv = document.getElementById("glass");
    var droppedCoin = document.getElementById('dropped_coin');
    var glass = document.getElementById('coin_div');

    var margin = (value == -1) ? 0.69 : marginValues[value];
    console.log('height', (document.body.clientHeight * margin).toString() + 'px')
    droppedCoin.src = "assets/coin/" + playerOrder[currentPlayer] + ".png";
    droppedCoin.style.display = 'block';
    droppedCoin.style.paddingTop = (document.body.clientHeight * margin).toString() + 'px';
    droppedCoin.classList.add('coinDown');
    droppedCoin.style.paddingTop = (document.body.clientHeight * 0.66).toString() + "px";

    setTimeout(() => {
        droppedCoin.style.display = 'none';
        var coinImage = document.createElement("IMG");
        coinImage.src = "assets/side_coin/" + playerOrder[currentPlayer] + ".png";
        coinImage.style.height = (coinWidth * coinNb).toString() + "px";
        coinImage.classList.add('side_coin');
        glass.appendChild(coinImage);
        marginVal += (coinWidth * coinNb);
        glassDiv.style.marginTop = (marginVal).toString() + "px";
    }, 599);

    // droppedCoin.style.marginTop = margin.toString() + 'px';
    // droppedCoin.style.display = 'block';
    // console.log(document.body.clientHeight);

    // for (margin; margin <= document.body.clientHeight * 0.70; margin += 15) {
    //     await sleep(10);
    //     droppedCoin.style.marginTop = margin.toString() + 'px';
    // }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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
        setTimeout(() => { reset(1) }, 200);
    });
    coin2.addEventListener('click', () => {
        coin2.classList.add('coin');
        coin1.style.height = "0px";
        coin3.style.height = "0px";
        setTimeout(() => { reset(2) }, 200);
    });
    coin3.addEventListener('click', () => {
        coin3.classList.add('coin');
        coin2.style.height = "0px";
        coin1.style.height = "0px";
        setTimeout(() => { reset(3) }, 200);
    });

    function reset(coinNb) {
        spinningCoinDivision.style.display = "none";
        coin1.style.height = "100%";
        coin2.style.height = "100%";
        coin3.style.height = "100%";
        initPowerBar(coinNb);
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
    var sizeGlass = numberCoin * coinWidth * 2;
    glass.style.height = (sizeGlass).toString() + "px";

    marginVal = -sizeGlass / 2;
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