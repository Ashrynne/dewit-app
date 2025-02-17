document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    
    // Check if tasks exist to set the initial border state
    if (document.querySelectorAll('.task-item').length > 0) {
        document.getElementById('taskList').classList.add('has-tasks');
    }
});

document.getElementById('addTaskBtn').addEventListener('click', function() {
    addTask();
});

document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default action of the Enter key (e.g., form submission)
        addTask();
    }
});

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

document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();

    // Focus the task input field when the page loads
    document.getElementById('taskInput').focus();

    // Check if tasks exist to set the initial border state
    if (document.querySelectorAll('.task-item').length > 0) {
        document.getElementById('taskList').classList.add('has-tasks');
    }
});


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskInput.value}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);

        saveTasksToLocalStorage();

        // Add border to the task list immediately when a task is added
        taskList.classList.add('has-tasks');

        taskInput.value = '';
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.querySelector('span').classList.contains('completed')
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
            taskItem.querySelector('span').classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox"${task.completed ? ' checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });

    // Set border if tasks exist after loading
    if (tasks.length > 0) {
        taskList.classList.add('has-tasks');
    }
}

