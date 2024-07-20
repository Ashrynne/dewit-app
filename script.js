document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskValue}</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);

        saveTasksToLocalStorage();

        taskInput.value = ''; // Clear the input field after adding the task
    }
});

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.tagName === 'INPUT') {
        e.target.parentElement.classList.toggle('completed');
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
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        if (task.text.trim() !== '') { // Additional check to prevent adding empty tasks
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            taskList.appendChild(taskItem);
        }
    });
}

