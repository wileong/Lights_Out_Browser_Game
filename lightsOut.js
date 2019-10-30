const WIDTH = 7;
const HEIGHT = 5;
const DIFFICULTY = 3;

//future reading:  diff between var and let

// Pick a random number 1 to max

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1; 
}

//functions will always return something
// so if nothing, it returns undefined
// Toggle a single cell on <-> off
//y is the row, x  is the column
// find the cell at y,x and change it off<->on
function toggleCell(y, x) {
  if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
    let id = "#cell-" + y + "-" + x;//i.e. "#call-4-1"; ... why # here? not the actual id
    //use # to find by string-> this is id selector
    //without #, it's an id, according to Joel
    console.log("toggleCell", id);
    
    //querySelector is built into browser.
    
    let cell = document.querySelector(id);
    
    //get list of classes on this cell and
    // there's a method called toggle
    cell.classList.toggle("on");
    
  }
}


// Look at all cells to see if won -- returns true/false

function checkForWin() {
  for (let cell of document.querySelectorAll(".cell")) {
    //classList.. think of this like an ArrayList
    if (cell.classList.contains("on")) {
      return false;
    }
  }

  return true;
}


// toggle this cell and top/left/right/bottom neighbors
//y and x refers to cell middle of "Cross"
function toggleCellAndNeighbors(y, x) {
  toggleCell(y - 1, x);
  toggleCell(y, x - 1);
  toggleCell(y, x);
  toggleCell(y, x + 1);
  toggleCell(y + 1, x);
}


// pop up a winning message & reset

function handleWin() {
  //pop up in browser
  // however note that you can maniipulate DOM
  // to hide board and pop up message
  alert("Great job!");
  setupRandomBoard();
}


// handle player clicking on cell:
//
// - find out where they clicked
// - toggle that cell and its neighbors
// - if they won, pop up winning message

//event in JavaScript is a thing the BROWSER 
//sends you to tell what happened
function handleCellClick(event) {
  let id = event.target.id;// thing you did something to; example in this case: "cell-4-1"
  let y = Number(id[5]); //Number() takes in a string;
  let x = Number(id[7]);
  console.log("clicked on", x, y);

  toggleCellAndNeighbors(y, x);

  if (checkForWin()) {
    setTimeout(handleWin, 500); // 500ms = 1/2sec
  }
}


// Setup random board

function setupRandomBoard() {
  for (let i = 0; i < DIFFICULTY; i++) {
    let x = randomNumber(WIDTH) - 1;
    let y = randomNumber(HEIGHT) - 1;
    toggleCellAndNeighbors(y, x);
  }
}


// Add "click listener" to each cell

function addClickListeners() {
  //queryselectorAll finds all that matches cell..so all cells
  for (let cell of document.querySelectorAll(".cell")) {
    console.log("addClickListeners", cell);
    cell.addEventListener("click", handleCellClick); //handleCellClick in this case is aka a CALLBACK function. browser calls this function only when someone clicks on this cell
  }
}


// Code that runs when page first loads:

setupRandomBoard();
addClickListeners();