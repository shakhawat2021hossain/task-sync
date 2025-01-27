let tasks = JSON.parse(localStorage.getItem('tasks')) || []

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = (title, description, priority) => {
    const task = {
        id: Date.now(),
        title,
        description,
        priority,
        completed: false
    }
    // console.log(task);
    tasks.push(task)
    saveTasks()
    renderTasks()
}

const completeTask = (taskId) => {
    tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task?.completed } : task
    );
    saveTasks();
    renderTasks();
};

const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task?.id !== taskId)
    saveTasks()
    renderTasks()
}

const updateTask = (taskId, update) => {
    tasks = tasks.map(task => task.id === taskId ? { ...task, ...update } : task)
    saveTasks()
    renderTasks()
}
const editTask = (taskId) => {
    console.log(taskId);
    const task = tasks.find(task => task?.id === taskId)
    const newTitle = prompt("Enter new title:", task.title);
    const newDescription = prompt("Enter new description:", task.description);
    const newPriority = prompt(
        "Enter new priority (low, medium, high):",
        task.priority
    );
    updateTask(taskId, {
        title: newTitle || task?.title,
        description: newDescription || task?.description,
        priority: newPriority || task?.priority,
    });

}

const renderTasks = () => {
    const taskList = document.getElementById('taskList')
    taskList.innerHTML = ''

    tasks?.forEach(task => {
        const taskDiv = document.createElement('div')
        taskDiv.className = `task-item ${task?.completed ? 'task-completed' : ''}`;
        taskDiv.innerHTML = `
            <h3>${task?.title}</h3>
            <p>${task?.description}</p>
            <span>Priority: ${task?.priority}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="completeTask(${task?.id})">
                    ${task?.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task?.id})">Delete</button>
                <button class="update-btn" onclick="editTask(${task?.id})">Update</button>

            </div>
            
        `;
        taskList.appendChild(taskDiv)
    });
}

document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('taskTitle').value
    const description = document.getElementById('taskDescription').value
    const priority = document.getElementById('taskPriority').value
    addTask(title, description, priority)

    e.target.reset()

})

renderTasks()

// console.log(tasks);
document.getElementById('sort').addEventListener('change', (e) =>{
    const selectedValue = e.target.value;
    console.log('Selected value:', selectedValue)
    
    if(selectedValue === 'dsc'){
        tasks = tasks.reverse()
        renderTasks()
    }
    else if(selectedValue === 'asc'){
        renderTasks()
    }
})
document.getElementById('filter').addEventListener('change', (e) =>{
    const selectedValue = e.target.value;
    console.log('Selected value:', selectedValue)
    
})
