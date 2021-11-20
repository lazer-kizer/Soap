class Constants {
    DEFAULT_DROP_SIZE = 50;
    MAX_DROP_SIZE = 100;
    MIN_DROP_SIZE = 1
}

class Coordinates {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

class Drop {
    constructor(size = Constants.DEFAULT_DROP_SIZE, coordinates = new Coordinates()) {
        this.size = size;
        this.coordinates = coordinates;
    }
}