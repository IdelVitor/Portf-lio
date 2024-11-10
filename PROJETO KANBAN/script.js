document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const columns = document.querySelectorAll('.column');

    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTask(taskText, 'emAbertoList');
            saveTasks();
            taskInput.value = '';
        }
    });

    function createTask(text, listId) {
        const taskItem = document.createElement('li');
        taskItem.textContent = text;
        taskItem.draggable = true;
        taskItem.addEventListener('dragstart', dragStart);
        taskItem.addEventListener('dragend', dragEnd);

        document.getElementById(listId).appendChild(taskItem);
    }

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
        event.target.classList.add('dragging');
    }

    function dragEnd(event) {
        event.target.classList.remove('dragging');
        saveTasks();
    }

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const taskText = event.dataTransfer.getData('text/plain');
        const listId = event.currentTarget.querySelector('.task-list').id;
        createTask(taskText, listId);
        document.querySelectorAll('.dragging').forEach(task => task.remove());
        saveTasks();
    }

    function saveTasks() {
        const tasks = {};
        columns.forEach(column => {
            const status = column.getAttribute('data-status');
            const listItems = column.querySelectorAll('.task-list li');
            tasks[status] = Array.from(listItems).map(item => item.textContent);
        });
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('kanbanTasks'));
        if (tasks) {
            Object.keys(tasks).forEach(status => {
                const listId = getListIdByStatus(status);
                tasks[status].forEach(text => createTask(text, listId));
            });
        }
    }

    function getListIdByStatus(status) {
        switch (status) {
            case 'em aberto':
                return 'emAbertoList';
            case 'bid':
                return 'bidList';
            case 'em andamento':
                return 'emAndamentoList';
            case 'entregue':
                return 'entregueList';
            default:
                return 'emAbertoList';
        }
    }
});
