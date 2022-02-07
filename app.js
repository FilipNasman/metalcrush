document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector(".grid");
    let width = 8;
    let squares = []; //all array of squares...
    let score = 0;


    //This is the array of all the possible backgrounds of the square div
    //You can set the cells content to preset CSS colors, hex or rgb colors or even a picture
    const candyColors = [
        "red",
        "yellow",
        "orange",
        "purple",
        "green",
        "blue"
    ];

    function createBoard() {
        for (i = 0; i < width * width; i++) {
            const square = document.createElement('div'); //create a div in DOM
            let randomColor = Math.floor(Math.random() * candyColors.length); //Make a random number between 0 and whatever size the color array is
            square.style.background = candyColors[randomColor]; //Set the background of the square to the random color
            square.setAttribute('id', i); //Set the id of the square to the counter of this for-loop
            square.setAttribute('draggable', true); //Make the square draggable
            grid.appendChild(square); //place the div as a child to grid in the DOM
            squares.push(square); //push the square to the squares array
        }
    }
    createBoard();

    // Dragging the Candy
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.background;
        squareIdBeingDragged = parseInt(this.id);
        console.log(squareIdBeingDragged + " is being dragged");
        console.log(colorBeingDragged + " color being dragged");
    }

    function dragEnd() {
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.background = colorBeingReplaced;
            squares[squareIdBeingDragged].style.background = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.background = colorBeingDragged;
        }
    }

    function moveDown() {
        //const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        for (i = width; i < (width * width); i++) {
            if (squares[i].style.background === '') {
                squares[i].style.background = squares[i - width].style.background;
                squares[i - width].style.background = '';
            }
        }
        for (i = 0; i < width; i++) {
            if (squares[i].style.background === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length); //Make a random number between 0 and whatever size the color array is
                squares[i].style.background = candyColors[randomColor];
            }
        }

    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        //this.style.background = "";
    }

    function dragDrop() {
        colorBeingReplaced = this.style.background;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.background = colorBeingDragged;
        squares[squareIdBeingDragged].style.background = colorBeingReplaced;
    }

    function checkRowForThree() {
        for (i = 0; i < 62; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.background;
            const isBlank = squares[i].style.background === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

            if (notValid.includes(i)) continue //This is pretty much a GOTO

            if (rowOfThree.every(index => squares[index].style.background === decidedColor && !isBlank)) {
                score += 3;
                document.getElementById('score').innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.background = '';
                })
            }
        }
    }
    //checkRowForThree();

    function checkColumnForThree() {
        for (i = 0; i < 48; i++) {
            let columnOfThree = [i, i + width, i + width + width];
            let decidedColor = squares[i].style.background;
            const isBlank = squares[i].style.background === '';
            //const notValid=[];
            //if(notValid.includes(i)) continue;
            if (columnOfThree.every(index => squares[index].style.background === decidedColor && !isBlank)) {
                score += 3;
                document.getElementById('score').innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.background = '';
                })
            }
        }
    }
    //checkColumnForThree();
    function checkMove(checkCase, points) {



        for (i = 0; i < width * width; i++) {
            switch (checkCase) {
                case 'threeRow':
                    arrCase = [i, i + 1, i + 2];
                    arrNoGo = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
                    break;
                case 'threeColumn':
                    arrCase = [i, i + width, i + width + width];
                    arrNoGo = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]; // code block                // code block
                    break;
                case 'fourRow':
                    arrCase = [i, i + 1, i + 2, i + 3];
                    arrNoGo = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]; // code block
                    break;
                case 'fourColumn':
                    arrCase = [i, i + width, i + width + width, i + width + width + width];
                    arrNoGo = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]; // code block
                    break;
                case 'fiveRow':
                    arrCase = [i, i + 1, i + 2, i + 3, i + 4];
                    arrNoGo = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]; // code block
                    break;
                case 'fiveColumn':
                    arrCase = [i, i + width, i + width + width, i + width + width + width + width];
                    arrNoGo = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]; // code block
                    break;
                case 'pool':
                    arrCase = [i, i + 1, i + width, i + width + 1];
                    arrNoGo = [55, 56, 57, 58, 59, 60, 61, 62, 63]; // code block
                    break;
                case 'cross':
                    arrCase = [i, i + width - 1, i + width + 1, i + width + width];
                    arrNoGo = [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]; // code block
                    break;
                default:
                    // code block
            }
            let decidedColor = squares[i].style.background;
            const isBlank = squares[i].style.background === '';

            if (arrNoGo.includes(i)) continue //This is pretty much a GOTO

            if (arrCase.every(index => squares[index].style.background === decidedColor && !isBlank)) {
                score += points;
                document.getElementById('score').innerHTML = score;
                arrCase.forEach(index => {
                    squares[index].style.background = '';
                })
            }
        }
    }



    window.setInterval(function() {

        checkMove('pool', 50);
        checkMove('cross', 100);
        checkMove('fourRow', 5);
        checkMove('fourColumn', 5);
        checkMove('fiveRow', 10);
        checkMove('fiveColumn', 10);
        checkMove('threeRow', 3);
        checkMove('threeColumn', 3);
        moveDown();
    }, 1000 / 10);
})