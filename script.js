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
        
        taskInput.value = '';
    }
});

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');
    }
});

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});

