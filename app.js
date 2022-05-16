const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const winCharacter = '$';
const lostCharacter = 'X';

//Set Game Status: 0 = INIT, 1 = ON, 2 = WIN, 3 = LOST, 4 = END
let gameStat = 0;
const levels = [10,20,30];
const maxW = 50;
const maxH = 50;
let width;
let height;
let level;

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    for (let i=0;i<this.field.length;i++) {
      console.log(this.field[i].join(''));
    }
  }
  move(dir) {
    const fieldH = this.field.length;
    const fieldW = this.field[0].length;
    let coordX;
    let coordY;
    for (let i=0;i<fieldH;i++) {
      for (let j=0;j<fieldW;j++) {
        if (this.field[i][j] === '*') {
          coordY=i;
          coordX=j;
        }
      }
    }
    switch(dir.toLowerCase()) {
      case "up":
        if (coordY > 0) {
          //Move up is possible
          if (this.field[coordY-1][coordX] === fieldCharacter) {
            //Moving onto field
            this.field[coordY-1][coordX]=pathCharacter;
          } else if (this.field[coordY-1][coordX] === hat) {
            //Found the hat!
            this.field[coordY-1][coordX]=winCharacter;
            gameStat=2;
          } else {
            //Found the hole. Game Over
            this.field[coordY-1][coordX]=lostCharacter;
            gameStat=3;
          }
          this.field[coordY][coordX]=fieldCharacter;
        }
        break;
      case "down":
        if (coordY < fieldH) {
          //Move down is possible
          if (this.field[coordY+1][coordX] === fieldCharacter) {
            //Moving onto field
            this.field[coordY+1][coordX]=pathCharacter;
          } else if (this.field[coordY+1][coordX] === hat) {
            //Found the hat!
            this.field[coordY+1][coordX]=winCharacter;
            gameStat=2;
          } else {
            //Found the hole. Game Over
            this.field[coordY+1][coordX]=lostCharacter;
            gameStat=3;
          }
          this.field[coordY][coordX]=fieldCharacter;
        }
        break;
      case "left":
        if (coordX>0) {
          //Move left is possible
          if (this.field[coordY][coordX-1] === fieldCharacter) {
            //Moving onto field
            this.field[coordY][coordX-1]=pathCharacter;
          } else if (this.field[coordY][coordX-1] === hat) {
            //Found the hat!
            this.field[coordY][coordX-1]=winCharacter;
            gameStat=2;
          } else {
            //Found the hole. Game Over
            this.field[coordY][coordX-1]=lostCharacter;
            gameStat=3;
          }
          this.field[coordY][coordX]=fieldCharacter;
        }
        break;
      case "right":
        if (coordX < fieldW) {
          //Move right is possible
          if (this.field[coordY][coordX+1] === fieldCharacter) {
            //Moving onto field
            this.field[coordY][coordX+1]=pathCharacter;
          } else if (this.field[coordY][coordX+1] === hat) {
            //Found the hat!
            this.field[coordY][coordX+1]=winCharacter;
            gameStat=2;
          } else {
            //Found the hole. Game Over
            this.field[coordY][coordX+1]=lostCharacter;
            gameStat=3;
          }
          this.field[coordY][coordX]=fieldCharacter;
        }
        break;
    }
  }
  static generateField(width, height, level = 2) {
    let size = width * height;
    let holeCount = Math.floor(size*levels[level-1]/100);
    let output = [];
    let outputArr = [];
    let hatPlaced = false;
    //Fill the field with fields
    for (let i=0;i<size;i++) {
      output.push(fieldCharacter);
    }
    //Place the hat
    while (!hatPlaced) {
      const hatPos = Math.floor(Math.random()*size);
      if (hatPos > 1) {
        output[hatPos]=hat;
        hatPlaced=true;
      } 
    }
    //Place the holes
    while (holeCount>0) {
      const wholePos = Math.floor(Math.random()*size);
      if (output[wholePos] === fieldCharacter && wholePos !== 0) {
        output[wholePos] = hole;
        holeCount--;
      }
    }
    //Place the path character
    output[0]=pathCharacter;
    //Generate the output array
    let i = 0;
    for (let j=0;j<height;j++) {
      outputArr.push(output.slice(i,i+width));
      i+=width;
    }
    return outputArr;
  }
}
//Prompt for Field configuration
function fieldSetup() {
  width=0;
  height=0;
  level=0;
  while (!(width>=3 &&  width<=maxW)) {
    width = Number(prompt(`Width? (3-${maxW}) `));
  }
  while (!(height>=3 &&  height<=maxH)) {
    height = Number(prompt(`Height? (3-${maxW}) `));
  }
  while (!(level>=1 &&  level<=3)) {
    level = Number(prompt(`Level? (1-3) `));
  }
  
}

//Game playing starts here
while (gameStat<4) {
  if (gameStat === 0) {
    fieldSetup();
    gameStat = 1;
  }
  const myField = new Field(Field.generateField(width, height, level));
  while (gameStat === 1) {
    myField.print();
    dir = prompt('Which way? ');
    myField.move(dir);
  }

  myField.print();
  console.log(gameStat === 2 ? "You've won!" : "You've Lost!");
  console.log("GAME OVER"); 

  gameStat = prompt('Again? ').toLowerCase() === 'yes' ? (prompt('Same settings? ').toLowerCase() === 'yes' ? 1 : 0) : 4;
}

//console.log(myField);
