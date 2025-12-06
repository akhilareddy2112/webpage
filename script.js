let tasks = [];
let taskId = 0;

const taskTitleInput = document.getElementById('task-title');
const taskDatetimeInput = document.getElementById('task-datetime');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskTitle = taskTitleInput.value;
    const taskDatetime = taskDatetimeInput.value;

    if (taskTitle && taskDatetime) {
        const task = {
            id: taskId,
            title: taskTitle,
            datetime: taskDatetime,
            completed: false
        };

        tasks.push(task);
        taskId++;

        renderTaskList();
        taskTitleInput.value = '';
        taskDatetimeInput.value = '';
    }
}

function renderTaskList() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        const taskTitleElement = document.createElement('span');
        taskTitleElement.textContent = task.title;

        const taskDatetimeElement = document.createElement('span');
        taskDatetimeElement.textContent = ` - ${task.datetime}`;

        const taskActionsElement = document.createElement('div');
        taskActionsElement.classList.add('actions');

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
        completeButton.addEventListener('click', () => toggleCompleteTask(index));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskActionsElement.appendChild(completeButton);
        taskActionsElement.appendChild(editButton);
        taskActionsElement.appendChild(deleteButton);

        taskElement.appendChild(taskTitleElement);
        taskElement.appendChild(taskDatetimeElement);
        taskElement.appendChild(taskActionsElement);

        taskList.appendChild(taskElement);
    });
}

function toggleCompleteTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTaskList();
}

function editTask(index) {
    const taskTitle = prompt('Enter new task title:', tasks[index].title);
    const taskDatetime = prompt('Enter new task datetime:', tasks[index].datetime);

    if (taskTitle && taskDatetime) {
        tasks[index].title = taskTitle;
        tasks[index].datetime = taskDatetime;
        renderTaskList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}
