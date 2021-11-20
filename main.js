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
}

var wind = new Wind();

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
