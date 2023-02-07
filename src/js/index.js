import '../scss/styles.scss';

const formElement = document.getElementById('form');
const formInputElement = document.getElementById('form__input');
const todoListElement = document.getElementById('todo-list');
const filterClearElement = document.getElementById('filter__clear');

let allTasks = [];

const printFragment = fragment => {
  todoListElement.innerHTML = '';
  todoListElement.append(fragment);
};

const createFragment = array => {
  const fragment = document.createDocumentFragment();
  array.forEach(item => {
    const newTask = document.createElement('div');
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    const newImg = document.createElement('img');
    newImg.src = 'assets/images/icon-cross.svg';
    newImg.classList.add('close-icon');
    newInput.type = 'checkbox';
    newInput.id = item.id;
    newInput.classList.add('task__input');
    newLabel.htmlFor = item.id;
    newLabel.classList.add('task__label');
    newLabel.textContent = item.task;
    newTask.classList.add('task');
    newTask.append(newInput);
    newTask.append(newLabel);
    newTask.append(newImg);
    fragment.append(newTask);
  });
  printFragment(fragment);
};

const createObject = task => {
  const timeStamp = Date.now();
  const newObject = {};
  newObject.id = timeStamp;
  newObject.task = task;
  newObject.checked = false;
  allTasks.push(newObject);
  createFragment(allTasks);
};

const deleteTask = id => {
  const filteredArray = allTasks.filter(item => item.id !== id);
  allTasks = filteredArray;
  createFragment(allTasks);
};

todoListElement.addEventListener('click', e => {
  if (e.target.classList.contains('close-icon')) deleteTask(Number(e.target.previousSibling.htmlFor));
});

formElement.addEventListener('submit', e => {
  e.preventDefault();
  createObject(formInputElement.value);
});
