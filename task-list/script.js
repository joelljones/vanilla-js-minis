const card = document.querySelector('.card');
const newTask = document.querySelector('#enter-new-task');
const filter = document.querySelector('#filter-tasks');
const list = document.querySelector('.filtered-tasks');
const clrTasks = document.querySelector('#clear-tasks');

loadEventListeners();

function loadEventListeners() {
  // DOM
  document.addEventListener('DOMContentLoaded', getTasks);
  // add
  card.addEventListener('submit', addTask);
  // remove
  list.addEventListener('click', removeTask);
  // filter
  filter.addEventListener('keyup', filterTasks);
  // clear
  clrTasks.addEventListener('click', clearTasks);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li');

    // add class
    li.className = 'task d-flex';

    // create text node & append to li
    li.appendChild(document.createTextNode(task));

    // create span element
    const span = document.createElement('span');

    // add class
    span.className = 'remove-task ms-auto';

    // add icon html
    span.innerHTML = '<img src="x-square.svg" alt="" title="Bootstrap">';

    // append span to li
    li.appendChild(span);

    // append li to ul
    list.appendChild(li);
  });
}

function addTask(e) {
  if (newTask.value === '') {
    alert('Please enter a task...');
  }

  // create li element
  const li = document.createElement('li');

  // add class
  li.className = 'task d-flex';

  // create text node & append to li
  li.appendChild(document.createTextNode(newTask.value));

  // create span element
  const span = document.createElement('span');

  // add class
  span.className = 'remove-task ms-auto';

  // add icon html
  span.innerHTML = '<img src="x-square.svg" alt="" title="Bootstrap">';

  // append span to li
  li.appendChild(span);

  // append li to ul
  list.appendChild(li);

  // add to local storage
  addToLocalStorage(newTask.value);

  // clear input
  newTask.value = '';

  e.preventDefault();
}

function addToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('remove-task')) {
    if (confirm('Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  // remove from local storage
  removeFromLocalStorage(e.target.parentElement.parentElement);
}

function removeFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.task').forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.classList.add('d-flex');
      task.style.display = 'block';
    } else {
      task.classList.remove('d-flex');
      task.style.display = 'none';
    }
  });
}

function clearTasks() {
  if (confirm(`You're about to clear ALL tasks... Sure about that?`)) {
    list.innerHTML = '';
  }
  // remove from local storage
  clrFromLocalStorage();
}

function clrFromLocalStorage() {
  localStorage.clear();
}
