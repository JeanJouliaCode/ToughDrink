function startGame() {
      console.log('Im alive');

      waterAndGlassUp();
}



function waterAndGlassUp() {
      var water = document.getElementById("water");
      var glass = document.getElementById("glass");

      water.classList.add('waterUp');
      glass.classList.add('glassUp');
}