const boardObject = [
    {   
        id:1741325549285,
        boardName: "ToDo",
        description: "These tasks I have to do.",
        tasks: ["Task-1", "Task-2", "Task-3"]
    },
    {
        id:1741325578595,
        boardName: "In Progress",
        description: "Currently doing these tasks.",
        tasks: ["Task-1", "Task-2"]
    },
    {   
        id:1741325593155,
        boardName: "Done",
        description: "These tasks completed.",
        tasks: ["Task-1", "Task-4", "Task-3"]
    },
]

const container = document.getElementById("container");
boardObject.forEach((board)=>renderBoard(board));
const addTaskBtn = document.querySelectorAll(".add-task-btn");

function renderBoard(board){
    const divBoard = document.createElement("div");
    divBoard.setAttribute("class","board");
    // divBoard.setAttribute("id",`myboard-${board.id}`);
    // const [boardName, description, tasks] = board;
    
    divBoard.innerHTML = `<div class="board-head">
                <div class="head">
                    <span id="circle-icon" class="circle-icon"></span>
                    <h4>${board.boardName}</h4>
                    <span id="total-task" class="total-task">${board.tasks.length}</span>
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
    board.tasks.forEach((task)=>renderTask(task, divList));
    taskList.appendChild(divList);

}

function renderTask(task, divList){
    const liTask = document.createElement("li");
    liTask.setAttribute("class", "task");
    liTask.setAttribute("draggable", "true"); 
    liTask.innerHTML = `<div class="task-name">
                        <i class="fa-solid fa-circle-check" style="color: #04f11f;"></i>
                        <!-- <i class="fa-solid fa-circle-check" style="color: #afb1af;"></i> -->
                        <span>${task}</span>
                    </div>
                    <div class="task-modify">
                        <i class="fa-regular fa-trash-can" style="color: #080808;"></i>
                        <i class="fa-regular fa-pen-to-square" style="color: #080808;"></i>
                    </div> `                
    divList.appendChild(liTask);
}


addTaskBtn.forEach((taskBtn)=>{
    taskBtn.addEventListener("click",()=>{
        let task = prompt("Enter Task: ");
        const currBoardId = Number(taskBtn.dataset.id);
        const currBoard = boardObject.filter((board)=>currBoardId === board.id)[0];
        currBoard.tasks.push(task);
        const divList = document.getElementById(`board-${currBoardId}`);
        divList.innerHTML = "";
        currBoard.tasks.forEach((task)=>renderTask(task, divList));      
    })
})

const allBoards = document.querySelectorAll(".board");
const allTaskList = document.querySelectorAll(".task-list");
const allTasks = document.querySelectorAll(".task");
allTasks.forEach((task)=>{
    task.addEventListener("dragstart",()=>{
        task.classList.add("flying");
    })
    task.addEventListener("dragend",()=>{
        task.classList.remove("flying");
    })
})
allBoards.forEach((board)=>{
    board.addEventListener("dragover",()=>{
        const dragTask = document.querySelector(".flying");
        const boardDecendent = board.children[1].children[0];   
        boardDecendent.appendChild(dragTask);       
    })
})
//0. make New Board list
//1. Solve dragging prbm
//2. make it sort
//3. Add delete, edit option
//4. Add isCompleted
//5. Store it in local storage
//6. Have add more board option.
