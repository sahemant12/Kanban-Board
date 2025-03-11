import boardObject from "./data.js"
import {renderBoard, addTask, updateTotalTask, reRender} from "./script.js"

const addBoardBtn = document.getElementById("add-board-btn");
const boardInfo = document.getElementById("board-info");
const crossBtn = document.getElementById("cross");
const createBoardBtn = document.getElementById("create-btn");
const container = document.getElementById("container");
const selectColor = document.querySelectorAll(".color");

addBoardBtn.addEventListener("click",()=>{
    // boardInfo.style.display = "block";
    // container.style.opacity = "0.7";
    // container.style.pointerEvents = "none";

    const newBoard ={   
        id:Date.now(),
        boardName: "Hello",
        description: "Am I working",
        tasks: [],
        color:selectedColor
    }
    boardObject.push(newBoard);

    const currentBoard = renderBoard(newBoard);       
    addTask(currentBoard.children[2].children[0]);
    reRender();
    
})

crossBtn.addEventListener("click",()=>{
    boardInfo.style.display = "none";
    container.style.opacity = "1";
    container.style.pointerEvents = "auto"; 
})


let selectedColor = "#1a5ae4";
selectColor.forEach((color)=>{
    color.addEventListener("click",()=>{
        for(let removeColor of selectColor){
            if(color == removeColor){
                continue;               
            }
            removeColor.classList.remove("selected-color");
        }
        color.classList.toggle("selected-color");
        selectedColor = rgbToHex(window.getComputedStyle(color).backgroundColor);
            
    })
})

function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
}


createBoardBtn.addEventListener("click",()=>{
    
    const boardName = document.getElementById("board-name");
    const boardDescription = document.getElementById("board-description");
    const boardNameValue = boardName.value;
    const boardDescriptionValue = boardDescription.value;

    // if(!boardNameValue || !boardDescriptionValue) return;

    // const newBoard ={   
    //     id:Date.now(),
    //     boardName: boardNameValue,
    //     description: boardDescriptionValue,
    //     tasks: [],
    //     color:selectedColor
    // }
    const newBoard ={   
        id:Date.now(),
        boardName: "Hello",
        description: "Am I working",
        tasks: [],
        color:selectedColor
    }
    renderBoard(newBoard);
    // addTask(divBoard.children[2].children[0]);

    // boardObject.push(newBoard);
    boardName.value="";
    boardDescription.value="";

    boardInfo.style.display = "none";
    container.style.opacity = "1";
    container.style.pointerEvents = "auto";
    // console.log(boardObject);
})


//delete-board
// const deleteBoardBtn = document.querySelectorAll(".delete-board-btn");
// deleteBoardBtn.forEach((delBoardBtn)=>{
//     delBoardBtn.addEventListener("click",(e)=>{
//         const currBoard = e.target.dataset.id;
//         console.log(currBoard);
        
//     })
// })
