const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoFilter = document.querySelector('.filter-todo');
const error = document.getElementById('error');
const todoList = document.getElementById('todo-list');
const editError = document.getElementById('editError');
const setDeadline = document.getElementById('setDeadline');
let div = document.getElementById('todoDiv');
const uncompleteTasks = document.getElementById('uncompleteTasksLeft');
// setDeadline.type = 'toLocaleString';
// console.log(setDeadline.type);

renderTodos();
checkDeadline();
taskLefts();
uncompleteTasksLeft();
let timer = setInterval(renderTodos, 1000); 
setInterval(refreshFilterTodo,10);
todoBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',editTodo);

function addTodo(){

    error.style.visibility = 'hidden';
    editError.style.visibility = 'hidden';
    // console.log(myTaskManager.getTodosList());
    myTaskManager.add(todoInput.value,setDeadline.value ? (new Date(setDeadline.value).toString()) : null);    
    console.dir(setDeadline); 
    clearInput();
    todoInput.focus();
    renderTodos();
    todoFilter.value = 'filter';
    //setInterval(countDown, 1000);
}

function clearInput(){
    todoInput.value = '';
    setDeadline.value = '';
}

function renderTodos(){
    let html = '';
    //setInterval(renderTodos,1000);
    for(const todo of myTaskManager.getTodosList()){
            let countDate = new Date(todo.deadLine).getTime();
            let now = new Date().getTime();
            let theDiff = countDate - now;

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            let leftDays = Math.floor(theDiff / day);
            let leftHours = Math.floor((theDiff % day) / hour);
            let leftMinutes = Math.floor((theDiff % hour) / minute);
            let leftSeconds = Math.floor((theDiff % minute) / second);

        html += `<div data-todo-id=${todo.id} data-time-over="${todo.deadLine}" data-days="${leftDays}" "data-hours=${leftHours} data-minutes=${leftMinutes} data-seconds=${leftSeconds} id="todoDiv">
                <button class="edit-Content-btn"><i class="bi bi-pencil-fill"></i></button>
                <li data-li-text="${todo.text}" id="todoLI" class=${todo.TaskStatus.includes(Task.TaskStatus.uncompleted) ? "":"text-decoration-line-through"}>${todo.text}</li>
                <span class="deadline">${todo.deadLine? todo.deadLine.split(':00')[0] + `<div class="count-down">
        <div class="box-day">
            <span data-days=${leftDays} class="day">${leftDays < 0 || isNaN(leftDays) ? leftDays = 0 : leftDays}</span>
            <h6>Day</h6>
        </div>
        <div class="box-hour">
            <span data-hours=${leftHours} class="hour">${leftHours < 0 || isNaN(leftHours) ? leftHours = 0 : leftHours}</span>
            <h6>hour</h6>
        </div>
        <div class="box-minute">
            <span class="minute">${leftMinutes < 0 || isNaN(leftMinutes) ? leftMinutes = 0 : leftMinutes}</span>
            <h6>minute</h6>
        </div>
        <div class="box-second">
            <span class="second">${leftSeconds < 0 || isNaN(leftSeconds) ? leftSeconds = 0 : leftSeconds}</span>
            <h6>second</h6>
        </div>
    </div>` : ""}</span>
                <button class="task-completed-btn"><i class="bi bi-check2-square"></i></button>
                <button class="remove-task-btn"><i class="bi bi-trash-fill"></i></button>
            </div>`
            
    }
    todoList.innerHTML = html;
    checkDeadline();
    taskLefts();
    uncompleteTasksLeft();
}

function editTodo(e){
    error.style.visibility = 'hidden';
    editError.style.visibility = 'hidden';
    const idTodo = Number(e.target.parentElement.dataset.todoId);
    const liText = e.target.parentElement;
    console.dir(liText);
    if(e.target.classList[0] === 'remove-task-btn'){
        e.target.parentElement.classList.add('cssRemove');
            myTaskManager.delete(idTodo);
            
            renderTodos();
            refreshFilterTodo();
    }

    if(e.target.classList[0] === 'task-completed-btn'){
        myTaskManager.changeStatus(idTodo);
        console.log(e.target.parentElement);
        renderTodos();
    }
    
    if(e.target.classList[0] === 'edit-Content-btn'){
        const getTask = myTaskManager.findTodo(idTodo);
        if(getTask.TaskStatus === 'completed'){
            editError.style.visibility = 'visible';
            return;
        }
        
        const userEdit = prompt('Edit Your Task Here',e.target.nextElementSibling.innerHTML);
        todoFilter.value = 'All';
        console.log(userEdit);
        myTaskManager.edit(idTodo,userEdit);
        // console.dir(e.target.nextElementSibling);
        renderTodos();
    }
}
     function refreshFilterTodo(){
        //editError.style.visibility = 'hidden';
    //error.style.visibility = 'hidden';
        let ulList = todoList.childNodes;
        for(const task of ulList){
        const idTask = Number(task.dataset.todoId)
        const getTask = myTaskManager.findTodo(idTask);
         switch (todoFilter.value){
            case 'All':
                task.style.display = 'flex';
                break;
            case 'Done':
                if(getTask.TaskStatus === 'completed'){
                    task.style.display = 'flex';
                }else{
                    task.style.display = 'none';
                };
                break;
            case 'Uncompleted':
                if(getTask.TaskStatus !== 'completed'){
                    task.style.display = 'flex';
                }else{
                    task.style.display = 'none';
                };
                break;            
      }}
    }

    function checkDeadline(){
        let ulList = todoList.childNodes;
        for(const todo of ulList){
            console.dir(todo);
            const idTask = Number(todo.dataset.todoId)
            let deadlineUserChoise = todo.closest("div[data-time-over]").dataset.timeOver;
            console.log(deadlineUserChoise);
            //leftDays = todo.closest("span[data-days]").dataset.days;
            if(deadlineUserChoise == new Date()){
                myTaskManager.updateDeadline(idTask,'time over!!!')
                renderTodos();
                todo.style.background = 'red';
                // deadlineUserChoise = null;
                // console.log(deadlineUserChoise);
                // deadlineUserChoise.innerHTML = 'nullllll'
            }else if(deadlineUserChoise === 'time over!!!'){
                todo.style.background = 'red';
            }
        }
    }

    function taskLefts(){
        let ulList = todoList.childNodes;
        if(ulList.length === 0){
            todoList.innerHTML = `<h3 class="beach">No tasks left, you must go to the beach🌊</h3>`
        }
    }

    function uncompleteTasksLeft(){
         let taskLeftsamount = 0;
        for(const todo of myTaskManager.getTodosList()){
            if (todo.TaskStatus === 'uncompleted'){
                taskLeftsamount++;
            }
        }
        uncompleteTasks.innerHTML = `you have &nbsp <span style="color:red">${taskLeftsamount}</span>&nbsp tasks to exsicute`
        console.log(taskLeftsamount);
    }

    // window.addEventListener('load',refreshFilterTodo())
   
    
    


