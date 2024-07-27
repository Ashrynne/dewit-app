// Utility functions for cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
    return "";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

// Save tasks to cookies
function saveTasksToCookie() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.querySelector('span').classList.contains('completed')
        });
    });
    setCookie('tasks', JSON.stringify(tasks), 7); // Save for 7 days
}

// Load tasks from cookies
function loadTasksFromCookie() {
    const tasks = JSON.parse(getCookie('tasks') || '[]');
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    if (tasks.length > 0) {
        document.getElementById('separator').style.display = 'block';
    }
}

// Add task functionality
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${taskInput.value}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);
        saveTasksToCookie(); // Save to cookie after adding task

        taskInput.value = '';
        document.getElementById('separator').style.display = 'block'; // Show the line
    }
});

// Handle task completion and deletion
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('task-checkbox')) {
        e.target.nextElementSibling.classList.toggle('completed');
        saveTasksToCookie(); // Save to cookie after marking as completed
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveTasksToCookie(); // Save to cookie after deleting a task
    }
});

// Initialize tasks on page load
document.addEventListener('DOMContentLoaded', loadTasksFromCookie);

// Focus input field on load
window.addEventListener('load', () => {
    document.getElementById('taskInput').focus();
});

// Handle Enter key to add tasks
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('addTaskBtn').click();
    }
});

