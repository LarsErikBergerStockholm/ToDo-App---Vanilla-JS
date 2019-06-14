const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load alla event listeners
loadEventListeners();

// Load alla event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Skapa li element
    const li = document.createElement('li');
    // Lägg till class
    li.className = 'collection-item';
    // Skapa text node och appenda till li
    li.appendChild(document.createTextNode(task));
    // Skapa ny link element
    const link = document.createElement('a');
    // Lägg till klass
    link.className = 'delete-item secondary-content';
    // Lägg till icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Appenda link till li
    li.appendChild(link);

    // Appenda li till ul
    taskList.appendChild(li);
  });
}

// Lägg till Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Skapa li element
  const li = document.createElement('li');
  // Lägga till class
  li.className = 'collection-item';
  // Skapa text node och appenda till li
  li.appendChild(document.createTextNode(taskInput.value));
  // Skapa ny länk element
  const link = document.createElement('a');
  // Lägg till class
  link.className = 'delete-item secondary-content';
  // Lägg till ikon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Appenda link till li
  li.appendChild(link);

  // Appenda li till ul
  taskList.appendChild(li);

  // Store i LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ta bort Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Ta bort från LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Ta bort från LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ta bort Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Snabbare
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Ta bort Tasks från LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
