document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <span>${taskInput.value}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);

        saveTasksToLocalStorage();

        taskInput.value = '';
    }
});

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');
        saveTasksToLocalStorage();
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveTasksToLocalStorage();
    }
});

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            completed: item.firstChild.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });
}

