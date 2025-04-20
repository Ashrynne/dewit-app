<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
  loadTasksFromLocalStorage();
  document.getElementById('taskInput').focus();

  if (document.querySelectorAll('.task-item').length > 0) {
    document.getElementById('taskList').classList.add('has-tasks');
  }
=======
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
<<<<<<< HEAD

    // Focus the task input field when the page loads
    document.getElementById('taskInput').focus();

=======
    
>>>>>>> a1fd6d89e0df6b59f9835dbd7fca769cea5346f2
    // Check if tasks exist to set the initial border state
    if (document.querySelectorAll('.task-item').length > 0) {
        document.getElementById('taskList').classList.add('has-tasks');
    }
>>>>>>> main
});

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

<<<<<<< HEAD
document.getElementById('taskList').addEventListener('click', function (e) {
  if (e.target.type === 'checkbox') {
    e.target.nextElementSibling.classList.toggle('completed');
    saveTasksToLocalStorage();
  } else if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.task-item').remove();
    saveTasksToLocalStorage();

    if (document.querySelectorAll('.task-item').length === 0) {
      document.getElementById('taskList').classList.remove('has-tasks');
=======
document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
<<<<<<< HEAD
        e.preventDefault(); // Prevent default action (e.g., form submission)
=======
        e.preventDefault(); // Prevent the default action of the Enter key (e.g., form submission)
>>>>>>> a1fd6d89e0df6b59f9835dbd7fca769cea5346f2
        addTask();
>>>>>>> main
    }
  }
});

<<<<<<< HEAD
=======
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
        e.target.parentElement.querySelector('span').classList.toggle('completed');
        saveTasksToLocalStorage();
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveTasksToLocalStorage();

        // Remove border if there are no tasks
        if (document.querySelectorAll('.task-item').length === 0) {
            document.getElementById('taskList').classList.remove('has-tasks');
        }
    }
});

<<<<<<< HEAD
=======
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();

    // Focus the task input field when the page loads
    document.getElementById('taskInput').focus();

    // Check if tasks exist to set the initial border state
    if (document.querySelectorAll('.task-item').length > 0) {
        document.getElementById('taskList').classList.add('has-tasks');
    }
});


>>>>>>> a1fd6d89e0df6b59f9835dbd7fca769cea5346f2
>>>>>>> main
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const text = taskInput.value.trim();
  if (text === '') return;

  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  taskItem.innerHTML = `
    <div class="task-left">
      <input type="checkbox">
      <span>${text}</span>
    </div>
    <button class="delete-btn">x</button>
  `;

  taskList.appendChild(taskItem);

  saveTasksToLocalStorage();
  taskInput.value = '';
  taskList.classList.add('has-tasks');
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item.querySelector('span').classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
<<<<<<< HEAD
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
=======
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
<<<<<<< HEAD
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
=======
            taskItem.querySelector('span').classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox"${task.completed ? ' checked' : ''}>
>>>>>>> a1fd6d89e0df6b59f9835dbd7fca769cea5346f2
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
>>>>>>> main

    taskItem.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      </div>
      <button class="delete-btn">x</button>
    `;

    taskList.appendChild(taskItem);
  });

  if (tasks.length > 0) {
    taskList.classList.add('has-tasks');
  }
}

