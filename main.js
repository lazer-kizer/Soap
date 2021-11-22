class Constants {
    static DEFAULT_DROP_SIZE = 50;
    static DEFAULT_FIELD_HEIGHT = 1000;
    static DEFAULT_FIELD_WIDTH = 1000;
    static MAX_DROP_SIZE = 100;
    static MIN_DROP_SIZE = 1
}

class Drop {
    #size;
    #x;
    #y;
    constructor(size, x = 0, y = 0) {
        this.#size = size;
        this.#x = x;
        this.#y = y;
    }
    getX(){
      return this.#x;
    }
    getY(){
      return this.#y;
    }
    getSize(){
      return this.#size;
    }
    addSize(value){
      this.#size += value;
    }
    addX(value){
      this.#x += value;
    }
    addY(value){
      this.#y += value;
    }
}

class Wind {
    #x;
    #y;
    constructor(x = 0, y = 0){
        this.#x = x;
        this.#y = y;
    }
    getX(){
        return this.#x;
    }
    getY(){
        return this.#y;
    }
    addX(value){
        this.#x += value;
    }
    addY(value){
        this.#y += value;
    }
}

class Field {
    #width;
    #height;
    #drops = [];
    #wind;
    constructor(width, height, wind){
        this.#width = width;
        this.#height = height;
        this.#wind = wind;
    }
    
    tick(){
      this.#blowWind();
      this.#mergeDrops();
      console.clear();
      this.showInfos();
    }

    addDrop(drop){
      this.#drops.push(drop);
    }

    showInfos(){
      this.#drops.forEach((drop, index) => {
        console.log(`Drop #${index}: size = ${drop.getSize()}, x = ${drop.getX()}, y = ${drop.getY()}`);
      });
      console.log(`Wind: x = ${this.#wind.getX()}, y = ${this.#wind.getY()}`)
    }
    
    #blowWind = function(){
      this.#drops.forEach(drop => {
        drop.addX(Math.trunc(this.#wind.getX()/drop.getSize()));
        drop.addY(Math.trunc(this.#wind.getY()/drop.getSize()));
      });
    }
    
    #mergeDrops(){
      for(let i = 0; i < this.#drops.length; i++){
        for(let j = i + 1; j < this.#drops.length; j++){
          let firstDrop = this.#drops[i];
          let secondDrop = this.#drops[j];
          let squareDistance = Math.pow(Math.abs(firstDrop.getX() - secondDrop.getX()),2) +
            Math.pow(Math.abs(firstDrop.getY() - secondDrop.getY()),2);
          let squareDropsSizeSum = Math.pow(firstDrop.getSize() + secondDrop.getSize(),2);
          
          if(squareDistance <= squareDropsSizeSum){
            this.#drops.splice(j, 1);
            firstDrop.addSize(secondDrop.getSize());
            i = this.#drops.length;
            j = this.#drops.length;
            this.#mergeDrops();
          }
        }
      }
    }    
}

let wind = new Wind();
let field = new Field(Constants.DEFAULT_FIELD_WIDTH, Constants.DEFAULT_FIELD_HEIGHT, wind);
let drop1 = new Drop(10, 30, 50);
let drop2 = new Drop(20, 130, 150);
let drop3 = new Drop(20, 300, 20);
let drop4 = new Drop(20, 400, 750);
let drop5 = new Drop(20, 550, 330);
let drop6 = new Drop(20, 750, 800);
field.addDrop(drop1);
field.addDrop(drop2);
field.addDrop(drop3);
field.addDrop(drop4);
field.addDrop(drop5);
field.addDrop(drop6);

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    }
  
    switch (event.key) {
      case "Down":
      case "ArrowDown":
        wind.addY(-1);
        break;
      case "Up": 
      case "ArrowUp":
        wind.addY(1);
        break;
      case "Left": 
      case "ArrowLeft":
        wind.addX(-1);
        break;
      case "Right": 
      case "ArrowRight":
        wind.addX(1);
        break;
      default:
        return;
    }

    event.preventDefault();
}, true);

let intervalId = setInterval(() => field.tick(), 500);