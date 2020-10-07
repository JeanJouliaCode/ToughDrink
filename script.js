var numPlayer = 2;

var coinNumber = 0;

currentPlayer = 0;

var listCoinName = ["yellow", "red", "green", "blue"];

var playerOrder = [];

var playerCoinImage = [];

var position

var choosenCoin

var flag = true;

const coinWidth = 20;

var clicked = false;

//sound import
var drop1 = new Audio('assets/sound/dropCoinFinish1.mp3');
var drop2 = new Audio('assets/sound/dropCoinFinish2.mp3');
var fill = new Audio('assets/sound/fillSoundFinish.mp3');
var flip = new Audio('assets/sound/flip.mp3');
var landingCoin1 = new Audio('assets/sound/spin1.mp3');
var landingCoin2 = new Audio('assets/sound/spin2.mp3');
var landingCoin3 = new Audio('assets/sound/spin3.mp3');
var spin = new Audio('assets/sound/hitCoin.mp3');
var Skeewiff = new Audio('assets/sound/Skeewiff.mp3');
Skeewiff.volume = 0.1;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



function startGame() {
    initGlassMovement();
    setGlassWaterSize()
    setUpAddSelectPlayer();
}

function setPlayerCoin(nb) {
    currentPlayerDisplay = document.getElementById('currentPlayer');
    for (var i = 0; i < nb; i++) {
        var coin = document.createElement("IMG");
        coin.src = `assets/coin/${playerOrder[i]}.png`;
        coin.classList.add('playerCoin');
        playerCoinImage.push(coin);
        currentPlayerDisplay.appendChild(coin);
        if (i == 0) {
            coin.style.marginTop = "5px";
        }
    }



}

function initGlassMovement() {
    var glass = document.getElementById("glass");
    var val = 50;
    var direction = 0.01;

    maxVal = 51;
    minVal = 49;

    function move() {

        if (val < minVal) {
            maxVal = 51 - Math.random();
            direction = Math.abs(direction);
        } else if (val > maxVal) {
            minVal = 49 + Math.random();
            direction = -Math.abs(direction);
        }

        val += direction;

        glass.style.left = val.toString() + "%";
        requestAnimationFrame(move);
    }

    move();
}

function initPowerBar(coinNb) {
    choosenCoin = coinNb;
    var back_div = document.getElementById('black_width');
    var container = document.getElementById('select_power');
    var power_container = document.getElementById('power_container');
    var cursor = document.getElementById('cursor');
    cursorPosition = 0;

    position = 100;
    var direction = 3;
    clicked = false;

    container.style.display = "flex";

    function move() {

        position += direction;
        cursorPosition += direction;
        cursor.style.marginLeft = cursorPosition.toString() + "px";

        back_div.style.width = position.toString() + 'px';

        if (position > 630 || position < 10 || (Math.random() > 0.995)) {
            direction *= -1;
        }

        if (!clicked) {
            requestAnimationFrame(move);
        }

    }

    if (flag) {
        flag = false;
        power_container.addEventListener("mousedown", (event) => {
            clicked = true;
            var x = event.clientX - power_container.offsetLeft;
            cursor.style.display = "block";

            if (x - 5 < position || x - 5 > (position + 50 + 50 + 15 + 15 + 8 + 8 + 2)) {
                displayResult(3);
            } else if (x - 5 < position + 50 || x - 5 > (position + 50 + 15 + 15 + 8 + 8 + 2)) {
                displayResult(2);
            } else if (x - 5 < position + 50 + 15 || x - 5 > (position + 50 + 15 + 8 + 8 + 2)) {
                displayResult(1);
            } else if (x - 5 < position + 50 + 15 + 8 || x - 5 > (position + 50 + 15 + 8 + 2)) {
                displayResult(0);
            } else {
                displayResult(-1);
            }

            cursorPosition = x + power_container.offsetLeft;

            cursor.style.marginLeft = cursorPosition.toString() + "px";
        })
    }

    function displayResult(val) {
        setTimeout(() => {
            cursor.style.display = "none";
            container.style.display = "none";
            dropCoin(val, choosenCoin);
        }, 300);

    }

    move();
}

async function dropCoin(value, coinNb) {
    var marginValues = [0.40, 0.30, 0.10, 0.05];
    var glassDiv = document.getElementById("glass");
    var droppedCoin = document.getElementById('dropped_coin');
    var coinDiv = document.getElementById('coin_div');

    var margin = (value == -1) ? 0.5 : marginValues[value];

    droppedCoin.src = "assets/coin/" + playerOrder[currentPlayer] + ".png";
    droppedCoin.style.marginTop = (document.body.clientHeight * margin).toString() + 'px';
    droppedCoin.style.display = 'block';
    await sleep(400);
    droppedCoin.classList.add('coinDown');
    droppedCoin.style.marginTop = (document.body.clientHeight * 0.50).toString() + "px";

    if (value != -1) {
        marginVal += (coinWidth * coinNb);
    }

    if (marginVal + coinWidth * value <= 0) { // + glassDiv.offsetHeight
        setTimeout(() => {
            droppedCoin.style.display = 'none';
            var coinImage = document.createElement("IMG");
            coinImage.src = "assets/side_coin/" + playerOrder[currentPlayer] + ".png";
            coinImage.style.height = (coinWidth + coinNb * 10).toString() + "px";
            coinImage.classList.add('side_coin');
            if (coinDiv.children.length == 0) {
                coinImage.style.marginBottom = "10px";
            }

            var offset = Math.floor(Math.random() * 5) + 5;

            if (Math.random() > 0.5) {
                coinImage.style.marginLeft = offset.toString() + "px";
            } else {
                coinImage.style.marginRight = offset.toString() + "px";
            }

            coinDiv.appendChild(coinImage);


            if (Math.random() > 0.5) {
                drop1.play();
            } else {
                drop2.play();
            }


            if (value != -1) {
                glassDiv.style.marginTop = (marginVal + coinWidth * value).toString() + "px";
                setTimeout(() => {
                    glassDiv.style.marginTop = (marginVal).toString() + "px";
                }, 300);
            }

            setTimeout(() => {
                playerCoinImage[currentPlayer].style.marginTop = "0px";
                currentPlayer = (currentPlayer + 1) % numPlayer;
                playerCoinImage[currentPlayer].style.marginTop = "5px";
                showSpinningCoin();
            }, 400);
        }, 599);
    } else {
        setTimeout(() => {
            droppedCoin.style.display = 'none';
            var coinImage = document.createElement("IMG");
            coinImage.src = "assets/side_coin/" + playerOrder[currentPlayer] + ".png";
            coinImage.style.height = (coinWidth + coinNb * 10).toString() + "px";
            coinImage.classList.add('side_coin');
            coinDiv.appendChild(coinImage);
            glassDiv.classList.remove('glassUp');

            setTimeout(() => {
                displayLoser();
            }, 500);

        }, 599);

    }
}

function reset() {
    numPlayer = 2;
    coinNumber = 0;
    currentPlayer = 0;
    listCoinName = ["yellow", "red", "green", "blue"];
    playerOrder = [];
    playerCoinImage = [];
    position
    choosenCoin
    water.classList.remove('waterUp');
    document.getElementById('coin_list').innerHTML = "";
    document.getElementById('currentPlayer').innerHTML = "";
}

function displayLoser() {
    if (numPlayer == 2) {
        var winnerDiv = document.getElementById('winnerDiv');
        var winnerSpan = document.getElementById('winnerName');
        playerCoinImage[currentPlayer].style.marginTop = "0px";
        playerCoinImage[currentPlayer].src = `assets/coinLost/${playerOrder[currentPlayer]}.png`;
        playerCoinImage.splice(currentPlayer, 1);

        currentPlayer = (currentPlayer + 1) % numPlayer;

        winnerSpan.textContent = playerOrder[currentPlayer];

        winnerDiv.style.display = "flex";
        switch (playerOrder[currentPlayer]) {
            case 'yellow':
                winnerSpan.style.color = "#F2A52C";
                break;
            case 'red':
                winnerSpan.style.color = "#F64C27";
                break;
            case 'blue':
                winnerSpan.style.color = "#2852A9";
                break;
            case 'green':
                winnerSpan.style.color = "#4DA038";
                break;
        }

        setTimeout(() => {
            winnerDiv.style.display = "none";
            reset();
            setGlassWaterSize()
            setUpAddSelectPlayer();
        }, 3000);

    } else {
        var loserDiv = document.getElementById('loserDiv');
        var loserSpan = document.getElementById('loserName');
        var water = document.getElementById("water");
        loserSpan.textContent = playerOrder[currentPlayer];
        switch (playerOrder[currentPlayer]) {
            case 'yellow':
                loserSpan.style.color = "#F2A52C";
                break;
            case 'red':
                loserSpan.style.color = "#F64C27";
                break;
            case 'blue':
                loserSpan.style.color = "#2852A9";
                break;
            case 'green':
                loserSpan.style.color = "#4DA038";
                break;
        }
        numPlayer--;
        playerCoinImage[currentPlayer].style.marginTop = "0px";
        playerCoinImage[currentPlayer].src = `assets/coinLost/${playerOrder[currentPlayer]}.png`;
        playerCoinImage.splice(currentPlayer, 1);
        console.log(currentPlayer)
        console.log(playerOrder);
        playerOrder.splice(currentPlayer, 1);
        console.log(currentPlayer)
        console.log(playerOrder);
        currentPlayer = (currentPlayer + 1) % numPlayer;
        playerCoinImage[currentPlayer].style.marginTop = "5px";
        loserDiv.style.display = "flex";

        setTimeout(() => {
            water.classList.remove('waterUp');
        }, 500);


        setTimeout(() => {
            loserDiv.style.display = "none";
            setGlassWaterSize();
            waterAndGlassUp();
        }, 2000);
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function showSpinningCoin() {
    var spinningCoinDivision = document.getElementById("select_coin");

    var coin1 = document.getElementById("coin1");
    var coin2 = document.getElementById("coin2");
    var coin3 = document.getElementById("coin3");

    coin1.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";
    coin2.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";
    coin3.src = "assets/coin_gif/" + playerOrder[currentPlayer] + ".gif";

    spinningCoinDivision.style.display = "flex";
    spin.play();

    setTimeout(() => {
        coin1.src = "assets/1/" + playerOrder[currentPlayer] + ".png";
        landingCoin1.play();
    }, 800);
    setTimeout(() => {
        coin2.src = "assets/2/" + playerOrder[currentPlayer] + ".png";
        landingCoin2.play();
    }, 1100);
    await setTimeout(() => {
        coin3.src = "assets/3/" + playerOrder[currentPlayer] + ".png";
        landingCoin3.play();
    }, 1400);


    if (flag) {
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
    }

    function reset(coinNb) {
        spinningCoinDivision.style.display = "none";
        coin1.style.height = "";
        coin2.style.height = "";
        coin3.style.height = "";
        coin1.classList.remove('coin');
        coin2.classList.remove('coin');
        coin3.classList.remove('coin');
        initPowerBar(coinNb);
    }

}

function waterAndGlassUp() {
    fill.play();

    var water = document.getElementById("water");
    var glass = document.getElementById("glass");

    water.classList.add('waterUp');
    glass.classList.add('glassUp');

    setTimeout(() => showSpinningCoin(), 1200);
}

function setGlassWaterSize() {
    var glass = document.getElementById("glass");
    document.getElementById("coin_div").innerHTML = "";
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

    if (flag) {
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
            Skeewiff.play();
            selectPlayer.style.display = "none";

            for (var i = 0; i < numPlayer; i++) {
                playerOrder.push(listCoinName[i]);
            }

            shuffle(playerOrder);
            setPlayerCoin(numPlayer);


            waterAndGlassUp();
        });
    }

    selectPlayer.style.display = "block";
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}