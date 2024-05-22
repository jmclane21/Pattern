let cells = []
let cellX = 50
let cellY = 50
let step = false;

/**TODO
  insert button for step toggle
  change starting pattern
**/

function setup() {
  frameRate(10);
  createCanvas(500, 500)
  
  let step_button = createButton('Start Automata');
  step_button.position(50, 50);
  step_button.mousePressed(() => {
    step = !step;
    if(step){
      step_button.html("Stop Automata")
    }
    else{
      step_button.html("Start Automata")
    }
  });
  
  let reset_button = createButton('Reset Automata')
  reset_button.position(150,50);
  reset_button.mousePressed(() => {
     for(let x = 0; x < cells.length; x++){
       for(let y = 0; y < cells[x].length; y++){
          cells[x][y] = false;
       }
     }
  });
  
  //produces width/cellX many cols
  for(let x = 0; x < width/cellX; x ++){
    cells[x] = [];
    
    //produces height/cellY many rows
    for(let y = 0; y < height/cellY; y++){
      cells[x][y] = false;
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
  
  
  //add screen noise
  // Set the noise level and scale.
  let noiseLevel = 255;
  let noiseScale = 0.009;

  // Iterate from top to bottom.
  for (let y = 0; y < height; y += 1) {
    // Iterate from left to right.
    for (let x = 0; x < width; x += 1) {
      // Scale the input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      let nt = noiseScale * frameCount;

      // Compute the noise value.
      let c = noiseLevel * noise(nx, ny, nt);

      // Draw the point.
      stroke(c);
      point(x, y);
    }
  }
  
  //update cells
  for(let x = 0; x < cells.length; x++){
    for(let y = 0; y < cells[x].length; y++){
      if(step){
        updateCell(x,y);
      }
    }
  }
}

function mousePressed(){
  //take mouse position and tie it to a cell, then flip the cell status
  x = Math.floor(mouseX / cellX)
  y = Math.floor(mouseY / cellY)
  
  cells[x][y] = !(cells[x][y])
}
  
function updateCell(x,y){
  //check neighbors and go from there
  //helper func to get num neighbors
  //conway's rules
  neighbors = getNumNeighbors(x,y)
  if(neighbors < 2){
    cells[x][y] = false;
  }
  else if(neighbors >= 2 && neighbors <= 3){
    cells[x][y] = true;
  }
  else if(neighbors > 3){
    cells[x][y] = false;
  }
  if(cells[x][y] == false && neighbors == 3){
    cells[x][y] = true;
  }
  
}

function getNumNeighbors(i, j){
  var rowLimit = cells.length-1;
  var columnLimit = cells[0].length-1;
  var count = 0;

  for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
    for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
      if(x != i || y != j ) {
        if(cells[x][y] == true){
          count++
        }
      }
    }
  }
  return count;
}

function keyPressed(){
  if(key === 'c'){
    step = !step;
  }
  return false;
}
