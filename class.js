class Task{
   static currentID = 1;

   static TaskStatus = {
        completed: 'completed',
        uncompleted: 'uncompleted',
    }

    constructor(text,deadLine = null){
        this.id = Task.currentID++;
        this.text = text;
        this.TaskStatus = Task.TaskStatus.uncompleted;
        this.deadLine = deadLine;
    }

}



class TaskManager{

    tasksList = [];

    getTodosList(){
        return this.tasksList;
    }

    add(text,deadLine){
        if(text.length < 2 || typeof text !== 'string'){
            error.style.visibility = 'visible';
            return;
            
        }        
        const todo = new Task(text,deadLine);
        this.tasksList.push(todo);
        return todo.id;

    }

    findTodo(id){
        const found = this.tasksList.find((todo) => todo.id === id);
        if(found){
            return found;
        }

        throw new Error("ToDo ID wasn't found🤷‍♀️");
        
    }

    findIndex(id){
        const indexID = this.tasksList.map(e => e.id).indexOf(id);
        console.log(indexID);
        if(indexID > -1){
            console.log(`your task found in index ${indexID}`);
            return indexID;
        }else{
            throw new Error('there is no ID in any index🤷‍♀️')
        }
        
    }

    delete(id){
        const deletedTodo = this.findTodo(id);
        this.tasksList = this.tasksList.filter(todo => todo.id !== id);
        console.log(deletedTodo);
        
        return deletedTodo;
    }

    edit(id,text){
        
        const editedTodo = this.findTodo(id);
        
        if(text.length < 2 || typeof text !== 'string'){
            error.style.visibility = 'visible';
            // throw new Error('task must be at leat 2 characters!⛔')
            return;
        }
        
        editedTodo.text = text;
    }

    updateDeadline(id,text){
        const todoFound = this.findTodo(id);
        todoFound.deadLine = text;
        
    }
    

    changeStatus(id){
        const task = this.findTodo(id);
        const indexTask = this.findIndex(id);
        console.log(indexTask);
        
        if(this.tasksList[indexTask].TaskStatus.includes(Task.TaskStatus.uncompleted)){
            this.tasksList[indexTask].TaskStatus = Task.TaskStatus.completed;
            console.log('   שונה לקומפליטד - הייתי באיף הראשון');
            
        }else{
            this.tasksList[indexTask].TaskStatus = Task.TaskStatus.uncompleted;
            console.log(' סוף סוף נכנס לאיף השני');
        }

         return task;
}}

const myTaskManager = new TaskManager;

console.log(myTaskManager.add('complete project plan'));
console.log(myTaskManager.add('Buy a new computer chair'));
// console.log(myTaskManager.findTodo(1));
console.log(myTaskManager.changeStatus(1));







// myTaskManager.changeStatus(1)
console.log(myTaskManager);