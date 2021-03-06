//import helper functions
import utilities from './utilities.js';
import ls from './ls.js';


//add button
document.querySelector('#addBtn').onclick = newTodo;
loadTodos();

//load todos
function loadTodos(){
    const todoList = ls.getTodoList();
    todoList.forEach(todo => {
        const el = createTodoElement(todo)
        addToList(el);
    })
       
    var count = todoList.filter(element => element.completed === false).length;
    document.querySelector('#leftBtn').innerHTML = count + " tasks left";
}

//default export for the module
function newTodo(){
    const todo = createTodo();
    const todoDiv = createTodoElement(todo);
    addToList(todoDiv);
    ls.saveTodo(todo);
}

//create todo
function createTodo(){
    const input = document.querySelector('#todoInput');
    const newTodo = {id: Date.now(), content: input.value, completed: false }
    input.value = "";
    return newTodo;
}

//create todo element
function createTodoElement(todo){
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //complete button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.setAttribute('type', 'checkbox');
    completeBtn.setAttribute('com-id', todo.id);
    completeBtn.onclick = completedTodo;
    if (todo.completed){
        completeBtn.innerHTML="X";        
    }

    //todo content
    const todoContent = document.createElement('div')
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');
    todoContent.setAttribute('id', 'content');
    if(todo.completed){
        todoContent.style.textDecoration="line-through";
    }

    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('todo-delete-btn');
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

//add to list
function addToList(todoDiv){
    document.querySelector('#todos').appendChild(todoDiv);
}

//Event handler
function deleteTodo(e){
    const btn = e.currentTarget;
    ls.deleteTodo(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}

function completedTodo(e){
    var butn = e.currentTarget;
    var todoList = ls.getTodoList();
    console.log("todoList", todoList);

    todoList.forEach(item => {
        if(item.id == butn.getAttribute('com-id')){
            item.completed = !item.completed;        
        }
    });  
    ls.completedTodo(todoList);
    document.querySelector('#todos').innerHTML = '';
    loadTodos();  
}
        
document.getElementById('allBtn').addEventListener("click", allTodos);

    function allTodos() {       
        //hide the add button
        document.querySelector('#addBtn').hidden=false;
        document.querySelector('#todoInput').hidden=false;

        document.querySelector('#todos').innerHTML = '';
        loadTodos();        
    }

    document.getElementById('activeBtn').addEventListener('click', activeTodos);
    function activeTodos(){
        var todoList = ls.getTodoList();
        var activeFilter = todoList.filter( element => element.completed === false);       

        console.log(activeFilter); 
        document.querySelector('#todos').innerHTML = '';
        activeFilter.forEach(todo => {
        const el = createTodoElement(todo)
        addToList(el);
    })        
        //hide the add button
        document.querySelector('#addBtn').hidden=true;   
        document.querySelector('#todoInput').hidden=true;
        
    }
    
    document.getElementById('completedBtn').addEventListener('click', comTodos);
    function comTodos() {

        var todoList = ls.getTodoList();
        var completedFilter = todoList.filter( element => element.completed === true);       
    
        console.log(completedFilter); 
        document.querySelector('#todos').innerHTML = '';
        completedFilter.forEach(todo => {
        const el = createTodoElement(todo)
        addToList(el);
    })   
        //hide the input bar and the add button
        document.querySelector('#addBtn').hidden=true;
        document.querySelector('#todoInput').hidden=true;
    }

   
    

        
    
    
