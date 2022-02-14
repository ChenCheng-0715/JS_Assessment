// Create global variables and import prompt input from package

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

// set pathCharacter origin index
let locationY = 0;
let locationX = 0;
// set endGame flag
let endGame = false;


// Create Field Class with constructor for the game

class Field {

    field = [];

    constructor() {

        // current location of your character
        this.locationX = 0;
        this.locationY = 0;

        // create a 2D array
        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField(row, col, 0.2);

    }

    // Create generateField Method in the Field Class to generate the rows and columns with fields

    generateField(height, width, percentage = 0.1) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();

                // generate hole
                if (prob <= percentage) {
                    this.field[y][x] = hole;
                } else {
                    this.field[y][x] = fieldCharacter;
                }
            }
        }

        // set hat location
        let hatX; 
        let hatY; 
        // check if hat is generate at [0][0]
        do {
            hatX = Math.floor(Math.random()*10, 0);
            hatY = Math.floor(Math.random()*10, 0);
            this.field[hatY][hatX] = hat;
        } while (hatY == 0 && hatX == 0);

        // set character start position at [0][0]
        this.field[locationY][locationX] = pathCharacter;
    }



    // Create runGame, print, askQuestion Methods for the game
    runGame() {
        // implement your codes
        do {        
            this.print();
            this.askQuestion();
            this.checkEndGame();
            if (!endGame) {
                this.field[locationY][locationX] = pathCharacter;
            }

        } while (!endGame);
    }

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        let askAgain = true;
        do {
            const answer = prompt('Which way? ').toUpperCase();
            // implement your codes
    
            switch (answer) {
                case 'U': // move up
                    locationY--;
                    askAgain = false;
                    break;
                case 'D':// move down
                    locationY++;
                    askAgain = false;
                    break;
                case 'R':// move right
                    locationX++;
                    askAgain = false;
                    break;
                case 'L':// move left
                    locationX--;
                    askAgain = false;
                    break;
                default:
                    console.log('Enter U, D, L or R');
            }
    
        } while (askAgain)

    }


    checkEndGame() {
        if (locationY < 0 || locationY > 9 || locationX < 0 || locationX > 9) { // pathcharacter move out of boundary lose, end game
            console.log('Out of bounds - Game End!');
            endGame = true;
        } else if (this.field[locationY][locationX].toString() === '^') { // pathcharacter find hat win, end game
            console.log('Congrats, you found your hat!');
            endGame = true;
        } else if (this.field[locationY][locationX].toString() === 'O') { // path character match hole lose, end game
            console.log('Sorry, you fell down a hole!');
            endGame = true;
        } 
    }


} // end of class


// Instantiate Field Class to initialise constructor and generate rows and columns from the generateField Method. Call runGame Method to run the game

const myfield = new Field();
myfield.runGame();






