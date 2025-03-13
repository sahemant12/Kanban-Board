import boardObject from "./data.js"
const container = document.getElementById("container");
let allBoards;
let allTasks;
let addTaskBtn;

//1. render all board present in local storage
boardObject.forEach((board)=>renderBoard(board));

reRender();
dragNdrop();

//2.
addTaskBtn.forEach(addTask);



function reRender() {
    allBoards = document.querySelectorAll(".board");
    allTasks = document.querySelectorAll(".task");
    addTaskBtn = document.querySelectorAll(".add-task-btn");
}



function renderBoard(board){

    //create div element that have board  
    const divBoard = document.createElement("div");
    divBoard.setAttribute("class","board");
    divBoard.setAttribute("id",`myboard-${board.id}`);
    divBoard.setAttribute("data-id",`${board.id}`);
    divBoard.innerHTML = `<div class="board-head">
                <div class="head">
                    <span id="circle-icon" class="circle-icon" style="border-color:${board.color}"></span>
                    <h4>${board.boardName}</h4>
                    <span id="total-task" class="total-task" data-id=${board.id}>${board.tasks.length}</span>
                    <i class="fa-solid fa-ellipsis modify-board-icon" style="color: #0d0d0d;" data-id=${board.id} id="modify-board-icon"></i>
                    <div class="modify-board-container hidden-modify-board">
                        <button class="board-edit"><i class="fa-solid fa-pen edit-icon" style="color: #616161;"></i>Edit</button>
                        <button class="board-delete"><i class="fa-solid fa-trash" style="color: #616161;"></i>Delete</button>
                    </div>
                </div>
                <p id="description">${board.description}</p>
            </div>
            <div class="tasks-list" id=${board.id}></div>
            <div class="add-task">
                <button id="add-task-btn" data-id=${board.id} class="add-task-btn"><span id="plus">+</span>Add task</button>            
            </div>`
    container.appendChild(divBoard);

    //2. taskList will have all the task of given board
    const taskList = document.getElementById(`${board.id}`);
    board.tasks.forEach((task)=>taskList.appendChild(renderTask(task)));

    return divBoard;
}

//render each task
function renderTask(task){

    const liTask = document.createElement("li");
    liTask.setAttribute("class", "task");
    liTask.setAttribute("draggable", "true"); 
    liTask.innerHTML = `<div class="task-name">
                        <i class="fa-solid fa-circle-check" style="color: #afb1af; text-dec"></i>
                        <span class="task-value">${task}</span>
                    </div>
                    <div class="task-modify">
                        <i class="fa-solid fa-trash delete-icon" style="color: #616161;"></i>
                        <i class="fa-solid fa-pen edit-icon" style="color: #616161;"></i>
                    </div> `
    return liTask;
}


function addTask(target){
    target.addEventListener("click",()=>{

        //give prompt to create new task
        let task = prompt("Enter Task: ");
        if(!task) return;

        //get the id of current board
        const currBoardId = Number(target.dataset.id);

        //using id to get its board Object
        const currBoardObj = boardObject.filter((board)=>currBoardId === board.id)[0];
        //inside this board object-> push new created task.
        currBoardObj.tasks.push(task);
        
        //Now render only this new create task.
        const taskList = document.getElementById(`${currBoardObj.id}`);
        const newTask = renderTask(task);
        taskList.appendChild(newTask);

        //update total-task
        updateTotalTask();
        
        //drag this current-Task
        dragTask(newTask);       
        dragOverBoard(target.closest(".board"));

        //modifyTask new task
        modifyTask(newTask); 
        
    })
}

function dragNdrop(){

    allTasks.forEach((task)=>{
        dragTask(task);
        
        //modifyTask
        modifyTask(task);  
    })
    
    allBoards.forEach((board)=>{
        dragOverBoard(board);
    })
}

function dragOverBoard(board){  
    board.addEventListener("dragover", () => dragOver(board));
}

function dragOver(board){
      
    const movingTask = document.querySelector(".flying");
    if (!movingTask) return;
    
    //append this movingTask to current board    
    const allTaskElement = board.querySelector(".tasks-list");    
    allTaskElement.appendChild(movingTask);
}

function dragTask(target){  
    target.addEventListener("dragstart", () => dragStart(target));
    target.addEventListener("dragend", () => dragEnd(target));
}

function dragStart(target){
    target.classList.add("flying");
        //update board Object
        const targetBoard = target.parentElement.parentElement;
        const currBoardObj = getCurrBoardObj(targetBoard);
        const movingTaskValue = target.querySelector("span").textContent;

        const removeTaskIndex = currBoardObj.tasks.indexOf(movingTaskValue);
        currBoardObj.tasks.splice(removeTaskIndex, 1);
        updateTotalTask();
}

function dragEnd(target){
    target.classList.remove("flying");       
        //update board Object
        const targetBoard = target.parentElement.parentElement;
        const currBoardObj = getCurrBoardObj(targetBoard);
        const movingTaskValue = target.querySelector("span").textContent; 
              
        currBoardObj.tasks.push(movingTaskValue);
        updateTotalTask();
}

//update allTaskList
//5
function updateTotalTask(){
    allBoards.forEach((board)=>{
        
        const totalTasks = board.querySelector("#total-task");
        
        const currBoardObj = getCurrBoardObj(board);  
        totalTasks.textContent = currBoardObj.tasks.length;
    })
}
function getCurrBoardObj(board){
    const currBoardId = board.dataset.id;
    return boardObject.filter((obj)=>currBoardId==obj.id)[0];
}

//6 modify task
function modifyTask(taskModify){
    taskModify.addEventListener("click",(e)=>{
        
        if(e.target.classList.contains("delete-icon") || e.target.classList.contains("edit-icon")){            
            // const targetBoard = e.target.parentElement?.parentElement?.parentElement?.parentElement;            
            const targetBoard = e.target.closest(".board");

            const currBoardObj = getCurrBoardObj(targetBoard);             
            // const TaskValue = e.target.parentElement.parentElement.querySelector("span").textContent;             
            const TaskValue = e.target.closest(".task").querySelector(".task-value").textContent;
                         
            const removeTaskIndex = currBoardObj.tasks.indexOf(TaskValue);

            if(e.target.classList.contains("delete-icon")){
                currBoardObj.tasks.splice(removeTaskIndex, 1);
                updateTotalTask();
                taskModify.remove();
            }else{
                const editedTodo = prompt("Enter your task:", TaskValue).trim();
                if(!editedTodo) return;   
                currBoardObj.tasks.splice(removeTaskIndex, 1, editedTodo);
                e.target.closest(".task").querySelector(".task-value").textContent = editedTodo;
            }            
        }
    })
}

export {renderBoard, addTask, reRender, dragOverBoard, getCurrBoardObj};
