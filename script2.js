import boardObject from "./data.js"
const container = document.getElementById("container");

//render all board present in database//1
boardObject.forEach((board)=>renderBoard(board));

const addTaskBtn = document.querySelectorAll(".add-task-btn");

//render each board
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
                    <button id="delete-board-btn" data-id=${board.id} class="delete-board-btn">X</button>
                </div>
                <p id="description">${board.description}</p>
            </div>
            <div class="tasks-list" id=${board.id}></div>
            <div class="add-task">
                <button id="add-task-btn" data-id=${board.id} class="add-task-btn"><span id="plus">+</span>Add task</button>            
            </div>`
    container.appendChild(divBoard);

    //taskList will have all the task of given board
    const taskList = document.getElementById(`${board.id}`);

    // const divList = document.createElement("div");
    // divList.setAttribute("id",`board-${board.id}`);
    // divList.setAttribute("class","task-list");
    
    //2
    board.tasks.forEach((task)=>taskList.appendChild(renderTask(task)));
    // taskList.appendChild(divList);
    return divBoard;
}

//render each task
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



//3
addTaskBtn.forEach((taskBtn)=>{
    addTask(taskBtn);
})
function addTask(target){
    // console.log("1", boardObject);
    target.addEventListener("click",()=>{
        // console.log("yes", target);
        
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
        // console.log(taskList);

        //update total-task
        updateTotalTask();

        //drag this current-Task
        dragTask(newTask);

        //delete-edit-task
        modifyTask(newTask); 
        
        // completed(liTask.children[0]);
        //Update dragNDrop for each task
        dragNdrop();
    })
}


//4
// const allBoards = document.querySelectorAll(".board");
// const allTasks = document.querySelectorAll(".task");
let allBoards;
let allTasks;
function reRender() {
    allBoards = document.querySelectorAll(".board");
    allTasks = document.querySelectorAll(".task");
}
reRender();
function dragNdrop(){
    reRender();
    allTasks.forEach((task)=>{
        dragTask(task);
        
        //delete-edit-task
        modifyTask(task);  
    })
    
    allBoards.forEach((board)=>{
        board.addEventListener("dragover",(e)=>{
            e.preventDefault();
            // console.log("Hello");
            
            const movingTask = document.querySelector(".flying");
            if (!movingTask) return;
            
            //append this movingTask to current board
            const allTaskElement = board.children[1];    
            allTaskElement.appendChild(movingTask);
    
        })
    })
}
dragNdrop();
function dragTask(target){    
    target.addEventListener("dragstart",()=>{
        target.classList.add("flying");

        //update board Object
        const targetBoard = target.parentElement.parentElement;
        const currBoardObj = getCurrBoardObj(targetBoard);
        const movingTaskValue = target.querySelector("span").textContent;

        const removeTaskIndex = currBoardObj.tasks.indexOf(movingTaskValue);
        currBoardObj.tasks.splice(removeTaskIndex, 1);
        updateTotalTask();
    })
    target.addEventListener("dragend",()=>{
        target.classList.remove("flying");
        
        //update board Object
        const targetBoard = target.parentElement.parentElement;
        const currBoardObj = getCurrBoardObj(targetBoard);
        const movingTaskValue = target.querySelector("span").textContent;       
        currBoardObj.tasks.push(movingTaskValue);
        updateTotalTask();
    })
}

//update allTaskList
//5
function updateTotalTask(){
    reRender();
    allBoards.forEach((board)=>{
        // console.log("2", boardObject);
        
        const totalTasks = board.querySelector("#total-task");
        // console.log(board);
        
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
            const targetBoard = e.target.parentElement?.parentElement?.parentElement?.parentElement;            
            const currBoardObj = getCurrBoardObj(targetBoard);             
            const TaskValue = e.target.parentElement.parentElement.querySelector("span").textContent;             
            const removeTaskIndex = currBoardObj.tasks.indexOf(TaskValue);

            if(e.target.classList.contains("delete-icon")){
                currBoardObj.tasks.splice(removeTaskIndex, 1);
                updateTotalTask();
                taskModify.remove();
            }else{
                const editedTodo = prompt("Enter your task:", TaskValue.textContent);      
                currBoardObj.tasks.splice(removeTaskIndex, 1, editedTodo);
                e.target.parentElement.parentElement.querySelector("span").textContent = editedTodo;
            }
            
            
        }
    })
}

// const taskName = document.querySelectorAll(".task-name");

// taskName.forEach((taskspan)=>{
//     completed(taskspan);  
// })

// function completed(target){
//     target.addEventListener("click",()=>{
//         target.children[1].classList.toggle("add-strike");
//         target.children[0].classList.toggle("completed");
//     })
// }



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

export {renderBoard, addTask, updateTotalTask};
