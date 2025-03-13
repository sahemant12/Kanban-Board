import boardObject from "./data.js"
import {renderBoard, addTask, reRender, dragOverBoard, getCurrBoardObj} from "./script.js"

const addBoardBtn = document.getElementById("add-board-btn");
const boardInfo = document.getElementById("board-info");
const crossBtn = document.getElementById("cross"); 
const createBoardBtn = document.getElementById("create-btn");
const container = document.getElementById("container");
const selectColor = document.querySelectorAll(".circle-color");
const boardCreateDiv = document.getElementById("board-create-btn");
const boardEditDiv = document.getElementById("board-edit-btn");
const editCancelBtn = document.getElementById("cancel-btn");
const editSubmitBtn = document.getElementById("sumbit-btn");
const modifyBoardIcon = document.querySelectorAll(".modify-board-icon");

let selectedColor = "#1a5ae4";
let getCurrBoardObject = null;

//add new board Button
addBoardBtn.addEventListener("click", addBoard);

crossBtn.addEventListener("click", hideBoardInfoContainer);

selectColor.forEach((color)=>{
    color.addEventListener("click", () => selectBoardHeadColor(color));
});

createBoardBtn.addEventListener("click", createBoard);

function addBoard(){
    crossBtn.classList.remove("hidden");
    boardCreateDiv.classList.remove("hidden");
    boardEditDiv.classList.add("hidden");
    displayBoardInfoContainer();
}

function displayBoardInfoContainer(){
    boardInfo.style.display = "block";
    container.style.opacity = "0.7";
    container.style.pointerEvents = "none";
}

function hideBoardInfoContainer(){
    boardInfo.style.display = "none";
    container.style.opacity = "1";
    container.style.pointerEvents = "auto"; 
}

function selectBoardHeadColor(color){
    for(let removeColor of selectColor){
        if(color == removeColor){
            continue;               
        }
        removeColor.classList.remove("selected-color");
    }
    color.classList.toggle("selected-color");
    selectedColor = rgbToHex(window.getComputedStyle(color).backgroundColor);
}

function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
}


function createBoard(){
    const boardName = document.getElementById("board-name");
    const boardDescription = document.getElementById("board-description");
    const boardNameValue = boardName.value;
    const boardDescriptionValue = boardDescription.value;

    if(!boardNameValue || !boardDescriptionValue) return;

    const newBoard ={   
        id:Date.now(),
        boardName: boardNameValue,
        description: boardDescriptionValue,
        tasks: [],
        color:selectedColor
    }
    boardObject.push(newBoard);

    const currentBoard = renderBoard(newBoard);       
    addTask(currentBoard.querySelector(".add-task-btn"));
    reRender();
    dragOverBoard(currentBoard);
    boardName.value="";
    boardDescription.value="";
    hideBoardInfoContainer();

    currentBoard.querySelector(".modify-board-icon").addEventListener("click", boardInfoModify);
}


modifyBoardIcon.forEach((modifyboard)=>{
    modifyboard.addEventListener("click", boardInfoModify);
});

function boardInfoModify(e){
    const allModifyContainer = document.getElementsByClassName("modify-board-container");
    
    const displayModifyContainer = e.target.nextElementSibling;
    for(let remove of allModifyContainer){
        if(displayModifyContainer == remove) continue;        
        remove.classList.add("hidden-modify-board");
    }
    if(displayModifyContainer.classList.contains("modify-board-container")){
        displayModifyContainer.classList.toggle("hidden-modify-board");           
    }
    
    //get delete and edit button
    const deleteBoardBtn = displayModifyContainer.children[1];
    const editBoardBtn = displayModifyContainer.children[0];

    //get the board on which we perform operation.
    const mainBoard = displayModifyContainer.closest(".board");
    const mainBoardId = mainBoard.dataset.id;

    //get the index of board on which we perform operation
    const modifyBoardIndex = boardObject.findIndex((obj)=> mainBoardId==obj.id);

    //get current board object
    getCurrBoardObject = getCurrBoardObj(mainBoard);

    //delete the select board
    deleteBoardBtn.addEventListener("click",()=>{           
        boardObject.splice(modifyBoardIndex, 1);
        mainBoard.remove();               
    })

    const boardName = document.getElementById("board-name");
    const boardDescription = document.getElementById("board-description");

    editBoardBtn.addEventListener("click",()=>{
        if(!getCurrBoardObject) return;

        crossBtn.classList.add("hidden");
        boardCreateDiv.classList.add("hidden");
        boardEditDiv.classList.remove("hidden");

        displayModifyContainer.classList.add("hidden-modify-board");
        displayBoardInfoContainer();

        boardName.value = getCurrBoardObject.boardName;
        boardDescription.value = getCurrBoardObject.description;
        editCancelBtn.addEventListener("click", hideBoardInfoContainer);        
    })
}
editSubmitBtn.addEventListener("click", submitEdited);

function submitEdited(){
    const boardName = document.getElementById("board-name");
    const boardDescription = document.getElementById("board-description");
    if(!getCurrBoardObject) return;
    getCurrBoardObject.boardName = boardName.value;
    getCurrBoardObject.description = boardDescription.value;
    getCurrBoardObject.color = selectedColor;

    const mainBoardly = document.querySelector(`.board[data-id="${getCurrBoardObject.id}"]`);
    if(mainBoardly){
        mainBoardly.querySelector("h4").textContent = getCurrBoardObject.boardName;
        mainBoardly.querySelector("#description").textContent = getCurrBoardObject.description;
        mainBoardly.querySelector("#circle-icon").style.borderColor = getCurrBoardObject.color;
    }
    boardName.value="";
    boardDescription.value="";
    hideBoardInfoContainer();    
}
