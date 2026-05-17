const taskList = document.getElementById("taskList");
const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');

async function loadTasks(){
    const response = await fetch('/api/tasks');
    const result = await response.json();

    taskList.innerHTML = "";

    result.data.forEach(task =>{
        const li = document.createElement("li");
        li.textContent = task.title;
        taskList.appendChild(li);
    });
}   

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    });
    input.value = "";
    loadTasks();

})

loadTasks();