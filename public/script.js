const API = 'http://localhost:3000/tasks';

const list = document.getElementById('taskList');
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');


async function loadTasks() {

    const response = await fetch(API);

    const tasks = await response.json();

    list.innerHTML = '';

    tasks.forEach(task => {

        const li = document.createElement('li');

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
<span>${task.title}</span>

<div class="actions">

<button
class="done"
onclick="toggleTask(${task.id})"
>
✔
</button>

<button
class="delete"
onclick="deleteTask(${task.id})"
>
X
</button>

</div>
`;

        list.appendChild(li);

    });

}



async function addTask() {

    const title = input.value.trim();

    if (!title) return;

    await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title
        })
    });

    input.value = '';

    loadTasks();

}



async function toggleTask(id) {

    await fetch(
        `${API}/${id}`,
        {
            method: 'PUT'
        }
    );

    loadTasks();

}



async function deleteTask(id) {

    await fetch(
        `${API}/${id}`,
        {
            method: 'DELETE'
        }
    );

    loadTasks();

}


addBtn.addEventListener(
    'click',
    addTask
);

input.addEventListener(
    'keypress',
    (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }
);

loadTasks();