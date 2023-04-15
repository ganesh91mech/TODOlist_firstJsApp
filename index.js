// Get the input element and task list element
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Create an empty array to store the tasks
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Add event listener to the form
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    text: newTaskInput.value,
    completed: false
  };
  tasks.push(newTask);
  newTaskInput.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
});

// Render the tasks to the task list
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerText = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
    taskList.appendChild(li);
  });
}
