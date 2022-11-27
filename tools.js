let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector('.pencil-tool-cont');
let eraserToolCont = document.querySelector('.eraser-tool-cont');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let sticky = document.querySelector('.sticky');
let upload = document.querySelector('.upload');
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
// optionsFlag =>true =>show tools, optionsFlag =>flase =>hide tools
// toggling for tools cont
optionsCont.addEventListener('click', (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) openTools();
    else closeTools();
})
function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove('fa-times');
    iconElem.classList.add('fa-bars');
    toolsCont.style.display = 'flex';
}

function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove('fa-bars');
    iconElem.classList.add('fa-times');
    toolsCont.style.display = 'none';
    pencilToolCont.style.display = 'none';
    eraserToolCont.style.display = 'none';
}

// pencil toggling
// pencilflag => true => show pencil tool, pencilflag => false => hide pencil tool
pencil.addEventListener('click', (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) pencilToolCont.style.display = 'block';
    else pencilToolCont.style.display = 'none';
})
// eraser toggling
// eraserflag => true =>show eraser tool, eraserflag => false => hide eraser tool
eraser.addEventListener('click', (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) eraserToolCont.style.display = 'flex';
    else eraserToolCont.style.display = 'none';
})

upload.addEventListener('click', (e) => {
    console.log('hiii');
    // open file explorer
    let input = document.createElement('input');
    input.setAttribute('type', "file");
    input.click();
    input.addEventListener('change',(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickyCont = document.createElement('div');
        stickyCont.setAttribute('class', 'sticky-cont');
        stickyCont.innerHTML = `
        <div class="header-cont">
        <div class="minimise"></div>
        <div class="remove"></div>
        </div>
        <div class="notes-cont">
          <img src="${url}">
        </div>
        `;
        let minimise = stickyCont.querySelector('.minimise');
        let remove = stickyCont.querySelector('.remove');
        notesAction(remove, minimise, stickyCont);
        document.body.appendChild(stickyCont);
    
        stickyCont.onmousedown = function (event) {
            dragAndDrop(stickyCont, event);
        };
    
        stickyCont.ondragstart = function () {
            return false;
        };
    })
})
sticky.addEventListener('click', (e) => {
    let stickyCont = document.createElement('div');
    stickyCont.setAttribute('class', 'sticky-cont');
    stickyCont.innerHTML = `
    <div class="header-cont">
    <div class="minimise"></div>
    <div class="remove"></div>
    </div>
    <div class="notes-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;
    let minimise = stickyCont.querySelector('.minimise');
    let remove = stickyCont.querySelector('.remove');
    notesAction(remove, minimise, stickyCont);
    document.body.appendChild(stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
})

function notesAction(remove, minimise, stickyCont) {
    remove.addEventListener('click', (e) => {
        stickyCont.remove();
    })
    let minimiseFlag = false;

    minimise.addEventListener('click', (e) => {
        // 1st method

        minimiseFlag = !minimiseFlag;
        let notesCont = stickyCont.querySelector('.notes-cont');
        if (minimiseFlag === true) notesCont.style.display = 'none';
        else notesCont.style.display = 'block';

        // 2nd method

        //     let notesCont = stickyCont.querySelector(".notes-cont");
        //     let display = getComputedStyle(notesCont).getPropertyValue("display");//this will give 
        //    // the display property of notesCont
        //     if (display === "none") notesCont.style.display = "block";
        //     else notesCont.style.display = "none";
    })
}


function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}