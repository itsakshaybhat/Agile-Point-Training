async function fetchTasks(){
    const response = await fetch('/api/tasks');
    const data = await response.json();
    renderTasks(data.data);
}

function renderTasks(tasks){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task.id,task.title);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        taskList.appendChild(li);
    })
}

async function addTask(){
    const input = document.getElementById('taskInput');
    const title = input.value;
    if(!title){
        alert('Please enter a task');
        return;
    }
    await fetch('/api/tasks',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    })
    input.value = '';
    fetchTasks();
}


async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
};

async function editTask(id, currentTitle) {
    const newTitle = prompt('Edit task:', currentTitle);

    if (!newTitle) return;

    await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
    });

    fetchTasks();
}

fetchTasks();