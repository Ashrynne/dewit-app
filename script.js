document.addEventListener('DOMContentLoaded', function () {
  loadTasksFromLocalStorage();
  document.getElementById('taskInput').focus();

  if (document.querySelectorAll('.task-item').length > 0) {
    document.getElementById('taskList').classList.add('has-tasks');
  }
});

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

document.getElementById('taskList').addEventListener('click', function (e) {
  if (e.target.type === 'checkbox') {
    e.target.nextElementSibling.classList.toggle('completed');
    saveTasksToLocalStorage();
  } else if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.task-item').remove();
    saveTasksToLocalStorage();

    if (document.querySelectorAll('.task-item').length === 0) {
      document.getElementById('taskList').classList.remove('has-tasks');
    }
  }
});

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
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

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

