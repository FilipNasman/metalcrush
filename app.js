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
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        for (i = width; i < (width * width); i++) {

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
    checkRowForThree();

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
    checkColumnForThree();

    window.setInterval(function() {
        checkRowForThree();
        checkColumnForThree();
    }, 1000 / 10);
})