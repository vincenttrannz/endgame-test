document.addEventListener('DOMContentLoaded', drawBoard);

const alphabet = {
  1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I", 10: "J", 11: "K",
  12: "L", 13: "M", 14: "N", 15: "O", 16: "P", 17: "Q", 18: "R", 19: "S", 20: "T", 21: "U",
  22: "V", 23: "W", 24: "X", 25: "Y", 26: "Z",
};

function drawBoard(){
  const board = document.querySelector('#board');
  
  // each lines
  for(let i = 0; i < 100; i++) {
    // each column
    for(let j = 0; j < 100; j++) {
        // create a cell
        let cell = document.createElement("input");
        // add the cell class
        cell.classList.add("Cell");
        // declare type of the input
        cell.type = "text"
        // add style for each cell
        cell.style.top = 30 * i + "px";
        cell.style.left = 100 * j + "px";
        // declare the name for each cell
        if(cell.style.top == "0px" && cell.style.left == "0px"){
          cell.name = `blank cell`;
        } else if(cell.style.top == "0px"){
          cell.name = `ceiling cell ${j}`;
        } else if(cell.style.left == "0px"){
          cell.name = `row`
        } else {
          cell.name=`cell ${j}`;
        }
        // add it to the board
        board.appendChild(cell);
    }
  }

  for(let i = 0; i<board.children.length; i++){
    if(board.children[i].attributes.name.value.includes('ceiling')){
      // CEILING CELL REPLACEMENT
      let ceilingCell = document.createElement("div");

      // add style for the ceiling cell
      ceilingCell.classList.add(`Ceiling__cell`);
      ceilingCell.style.top = 0 + "px";
      ceilingCell.style.left = 100 * i + "px";

      board.children[i].replaceWith(ceilingCell)

      // conditional return the alphabet in regards with the number increment
      if(i <= 26){
        let node = document.createTextNode(alphabet[i])
        board.children[i].appendChild(node)
        
      } else if (i <= 52){
        let node = document.createTextNode(`A${alphabet[i-26]}`)
        board.children[i].appendChild(node)

      } else if (i <= 78){
        let node = document.createTextNode(`B${alphabet[i-52]}`)
        board.children[i].appendChild(node)

      } else if (i <= 100){
        let node = document.createTextNode(`C${alphabet[i-78]}`)
        board.children[i].appendChild(node)
      }

    // ROW CELL REPLACEMENT
    } else if (board.children[i].attributes.name.value.includes("row")){
      let rowCell = document.createElement("div")
          node = document.createTextNode(i/100);

       // add style for the ceiling cell
      rowCell.classList.add(`Row__cell`);

      board.children[i].replaceWith(rowCell)
      board.children[i].appendChild(node)

    // TOP CORNER (BLANK CELL) REPLACEMENT WITH RESET BUTTON
    } else if (board.children[i].attributes.name.value.includes("blank")){
      let blankCell = document.createElement("button");
          node = document.createTextNode("Reset")
      
      blankCell.classList.add(`Blank__cell`);
      blankCell.style.top = 30 + "px";
      blankCell.style.left = 0 + "px";

      board.children[i].replaceWith(blankCell)
      board.children[i].appendChild(node)
    };
  };

  for(let i = 0; i < board.children.length; i++){
    if(board.children[i].tagName === "INPUT"){
      let eachInput = board.children[i];
      setInput(eachInput)
    } else if (board.children[i].tagName === "BUTTON"){
      let button = board.children[i];
      button.setAttribute('type', 'button')
      button.addEventListener('click', reset)
    }
  }
}

function setInput(input){
  const inputArray = Array.prototype.push(input)
  let storeData = {}
  input.addEventListener('input', (event) =>{
    if(!isNaN(event.target.value)){
      storeData[`cell${inputArray}`] = event.target.value;
      // console.log(`Cell ${inputArray}` + " with the value is " + storeData[`cell${inputArray}`])
      // console.log(storeData)
      input.setAttribute('value', event.target.value)
      calculation(storeData, input)
    }
  })
}

function calculation (data, cell){
  
}

function reset(){
  let inputCell = document.querySelectorAll('input')
  for(let i = 0; i < inputCell.length; i++){
    let cell = inputCell[i]
    if (cell.value !== undefined) cell.value = "";
  }
}