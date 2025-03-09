const boardObject = [
    {   
        id:1741325549285,
        boardName: "ToDo",
        description: "These tasks I have to do.",
        tasks: ["Task-1", "Task-2", "Task-3"],
        color:"#1a5ae4"
    },
    {
        id:1741325578595,
        boardName: "In Progress",
        description: "Currently doing these tasks.",
        tasks: ["Task-1", "Task-2"],
        color:"#038b03"
    },
    {   
        id:1741325593155,
        boardName: "Done",
        description: "These tasks completed.",
        tasks: ["Task-1", "Task-4", "Task-3"],
        color:"#1a5ae4"
    },
]

const container = document.getElementById("container");
boardObject.forEach((board)=>renderBoard(board));
const addTaskBtn = document.querySelectorAll(".add-task-btn");

function renderBoard(board){
    const divBoard = document.createElement("div");
    divBoard.setAttribute("class","board");
    divBoard.setAttribute("id",`myboard-${board.id}`);
    // const [boardName, description, tasks] = board;
    divBoard.innerHTML = `<div class="board-head">
                <div class="head">
                    <span id="circle-icon" class="circle-icon" style="border-color:${board.color}"></span>
                    <h4>${board.boardName}</h4>
                    <span id="total-task" class="total-task" data-id=${board.id}>${board.tasks.length}</span>
                </div>
                <p id="description">${board.description}</p>
            </div>
            <div class="tasks-list" id=${board.id}></div>
            <div class="add-task">
                <button id="add-task-btn" data-id=${board.id} class="add-task-btn"><span id="plus">+</span>Add task</button>            
            </div>`
    container.appendChild(divBoard);

    const taskList = document.getElementById(`${board.id}`);
    const divList = document.createElement("div");
    divList.setAttribute("id",`board-${board.id}`);
    divList.setAttribute("class","task-list");

    board.tasks.forEach((task)=>divList.appendChild(renderTask(task)));
    taskList.appendChild(divList);
    return divBoard;
}

function renderTask(task){
    const liTask = document.createElement("li");
    liTask.setAttribute("class", "task");
    liTask.setAttribute("draggable", "true"); 
    liTask.innerHTML = `<div class="task-name">
                        <i class="fa-solid fa-circle-check" style="color: #afb1af; text-dec"></i>
                        <span>${task}</span>
                    </div>
                    <div class="task-modify">
                        <i class="fa-regular fa-trash-can delete-icon" style="color: #080808;"></i>
                        <i class="fa-regular fa-pen-to-square edit-icon" style="color: #080808;"></i>
                    </div> `
    return liTask;
}

const totalTasks = document.querySelectorAll(".total-task");
addTaskBtn.forEach((taskBtn)=>{
    addTask(taskBtn);
})
function addTask(target){
    target.addEventListener("click",()=>{
        //give prompt to create new task
        let task = prompt("Enter Task: ");
        if(!task) return;

        //get the id of current board
        const currBoardId = Number(target.dataset.id);

        //using id to get the board Object
        const currBoard = boardObject.filter((board)=>currBoardId === board.id)[0];

        //inside this board object->tasks push "new created task"
        currBoard.tasks.push(task);

        //Now render only this new create task.
        const divList = document.getElementById(`board-${currBoardId}`);
        const liTask = renderTask(task);
        divList.appendChild(liTask);
        dragTask(liTask);     
        completed(liTask.children[0]);
        modifyTask(liTask);

        //update total-task
        updateTotalTask(currBoard);
    })
}

function updateTotalTask(currBoard){
    totalTasks.forEach((totaltask)=>{
        const currBoardTotalTask = Number(totaltask.dataset.id);
        if(currBoard.id === currBoardTotalTask){
            totaltask.textContent = currBoard.tasks.length;                
        }
    })
}

const allBoards = document.querySelectorAll(".board");
const allTasks = document.querySelectorAll(".task");
allTasks.forEach((task)=>{
    dragTask(task);
    
    //for modify-task
    modifyTask(task);
    
})
allBoards.forEach((board)=>{
    // board.addEventListener("dragover",(e)=>{
    //     e.preventDefault();
    // })

    board.addEventListener("dragover",(e)=>{
        e.preventDefault();
        const movingTask = document.querySelector(".flying");
        // console.log(movingTask);
        if (!movingTask) return;    
        const boardDecendent = board.children[1]?.children[0];    
        boardDecendent.appendChild(movingTask); 


    // const afterElement = getDragAfterElement(board, e.clientY);
    // const draggable = document.querySelector('.flying');
    // const boardDecendent = board.children[1]?.children[0];
    // if (afterElement == null) {
    //     boardDecendent.appendChild(draggable)
    // } else {
    //     boardDecendent.insertBefore(draggable, afterElement)
    // }



    })
})
function dragTask(target){    
    target.addEventListener("dragstart",()=>{
        target.classList.add("flying");
        // document.body.appendChild(target);

    })
    target.addEventListener("dragend",()=>{
        target.classList.remove("flying");
        // document.body.removeChild(target); 
    })
}




const taskName = document.querySelectorAll(".task-name");

taskName.forEach((taskspan)=>{
    completed(taskspan);  
})

function completed(target){
    target.addEventListener("click",()=>{
        target.children[1].classList.toggle("add-strike");
        target.children[0].classList.toggle("completed");
    })
}

const deleteTask = document.querySelectorAll(".task-modify");

function modifyTask(taskModify){
    taskModify.addEventListener("click",(e)=>{
        if(e.target.classList.contains("delete-icon")){
            // taskModify.remove();
            console.log(e.target.parentElement);
            
        }
        if(e.target.classList.contains("edit-icon")){
            const editedTodo = prompt("Enter your task:");           
            taskModify.children[0].children[1].textContent = editedTodo;
        }
    })
}


// function getDragAfterElement(container, y) {
//     const draggableElements = [...container.querySelectorAll('.draggable:not(.flying)')]
  
//     return draggableElements.reduce((closest, child) => {
//       const box = child.getBoundingClientRect();
//       const offset = y - box.top - box.height / 2
//       if (offset < 0 && offset > closest.offset) {
//         return { offset: offset, element: child }
//       } else {
//         return closest;
//       }
//     }, { offset: Number.NEGATIVE_INFINITY }).element
//   }

//0. make New Board list
//5. Store it in local storage
//6. Have add more board option.

const addBoardBtn = document.getElementById("add-board-btn");
const crossBtn = document.getElementById("cross");
const boardInfo = document.getElementById("board-info");
const selectColor = document.querySelectorAll(".color");
const createBoardBtn = document.getElementById("create-btn");
addBoardBtn.addEventListener("click",()=>{
    boardInfo.style.display = "block";
    container.style.opacity = "0.7";

})

crossBtn.addEventListener("click",()=>{
    boardInfo.style.display = "none";
    container.style.opacity = "1";
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
    if(!boardNameValue || !boardDescriptionValue) return;

    const newBoard ={   
        id:Date.now(),
        boardName: boardNameValue,
        description: boardDescriptionValue,
        tasks: [],
        color:selectedColor
    }
    const divBoard = renderBoard(newBoard);
    addTask(divBoard.children[2].children[0]);
    boardName.value="";
    boardDescription.value="";
    boardInfo.style.display = "none";
})