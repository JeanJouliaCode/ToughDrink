numPlayer = 2;

function startGame() {
    console.log('Im alive');

    var coinNumber = setGlassWaterSize()
        //waterAndGlassUp();
    setUpAddSelectPlayer();
}



function waterAndGlassUp() {
    var water = document.getElementById("water");
    var glass = document.getElementById("glass");

    water.classList.add('waterUp');
    glass.classList.add('glassUp');
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
    var listCoinName = ["yellow", "red", "green", "blue"];
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
        waterAndGlassUp();
    });

    selectPlayer.style.display = "block";
}