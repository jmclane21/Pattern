let cells = []
let cellX = 50
let cellY = 50
let step = true;

/**TODO
  insert button for step toggle
  change starting pattern
**/

function setup() {
  createCanvas(windowWidth, windowHeight)
  
  //produces width/cellX many cols
  for(let x = 0; x < width/cellX; x ++){
    cells[x] = [];
    
    //produces height/cellY many rows
    for(let y = 0; y < height/cellY; y++){
      //produces checkerboard pattern
      if((x % 2 == 0 && y % 2 != 0) || (x % 2 != 0 && y % 2 == 0)){
        cells[x][y] = true;
      }
      else{
        cells[x][y] = false;
      }
    }
  }
}


function draw() {
  clear();
  //draw contents of cells, black if 0, white else
  for(let x = 0; x < cells.length; x++){
    for(let y = 0; y < cells[x].length; y++){
      //true cells are black, false are white
      if(cells[x][y]){
        fill(0,0,0);
      }
      else{
        noFill()
      }
      rect(x*cellX, y*cellY, cellX, cellY)
    } 
  }
  
  if(!step){
    updateCells();
  }
}

function mousePressed(){
  //take mouse position and tie it to a cell, then flip the cell status
  x = Math.floor(mouseX / cellX)
  y = Math.floor(mouseY / cellY)
  
  cells[x][y] = !(cells[x][y])
  getNumNeighbors(x,y);
}
  
function updateCells(){
  //check neighbors and go from there
  //helper func to get num neighbors
  
  for(let x = 0; x < cells.length; x++){
    for(let y = 0; y < cells.length; y++){
      neighbors = getNumNeighbors(x,y)
      if(neighbors >= 2){
        cells[x][y] = true;
      }
      if(neighbors > 6){
        cells[x][y] = false;
      }
    }
  }
  
}

function getNumNeighbors(i, j){
  var rowLimit = cells.length-1;
  var columnLimit = cells[0].length-1;
  var count = 0;

  for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
    for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
      if(x !== i || y !== j ) {
        if(cells[x][y]){
          count++
        }
      }
    }
  }
  return count;
}
