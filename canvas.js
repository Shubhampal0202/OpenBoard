let canvas = document.querySelector('canvas');
let pencilColor = document.querySelectorAll('.pencil-color');
let pencilWidthElm = document.querySelector('.pencil-width');
let eraserWidthElm = document.querySelector('.eraser-width');
let download = document.querySelector('.download');
let undo = document.querySelector('.undo');
let redo = document.querySelector('.redo');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let penColor = 'red';
let eraserColor = 'white';
let penWidth = pencilWidthElm.value;
let eraserWidth = eraserWidthElm.value;
let tool = canvas.getContext('2d');
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;
let undoRedoTracker = [];
let track = 0;
// pencil implementation
let mouseDown = false;
// mousedown => start new path, mousemove => path fill(graphics)
canvas.addEventListener("mousedown", (e) => {
    beginPath({
        x: e.clientX,
        y: e.clientY
    })

})
canvas.addEventListener("mousemove", (e) => {

    if (mouseDown) {
        drawStroke({
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : pencilColor,
            width: eraserFlag ? eraserWidth : penWidth
        })
    }

})
canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
})

undo.addEventListener('click', (e) => {
    if (track > 0) {
        track--;
    }
    // track action
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})
redo.addEventListener('click', (e) => {
    if (track < undoRedoTracker.length - 1) {
        track++;
    }
    // track action
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})
function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image();
    console.log(img);
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}

function beginPath(strokeObj) {
    mouseDown = true;
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorElm) => {
    colorElm.addEventListener('click', (e) => {
        let color = colorElm.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElm.addEventListener('change', (e) => {
    penWidth = pencilWidthElm.value;
    tool.lineWidth = penWidth;
})
eraserWidthElm.addEventListener('change', (e) => {
    eraserWidth = eraserWidthElm.value;
    tool.lineWidth = eraserWidth;
})

// accessing the variables from tools.js
eraser.addEventListener('click', (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;

    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

// download canvas data
download.addEventListener('click', (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement('a');
    a.href = url;
    a.download = 'board.jpg';
    a.click();
})




