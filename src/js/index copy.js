import '../scss/styles.scss';

const formElement = document.getElementById('form');
const formInputElement = document.getElementById('form__input');
const todoListElement = document.getElementById('todo-list');
const filterClearElement = document.getElementById('filter__clear');

const allTasks = [];

const createObject = (id, task, checked) => {
  const newObject = {};
  newObject.id = id;
  newObject.task = task;
  newObject.checked = checked;
  return newObject;
};

const createTask = task => {
  const timeStamp = Date.now();
  allTasks.push(createObject(timeStamp, task, false));
  console.log(allTasks);
  const newTask = document.createElement('div');
  const newInput = document.createElement('input');
  const newLabel = document.createElement('label');
  const newImg = document.createElement('img');
  newImg.src = 'assets/images/icon-cross.svg';
  newImg.classList.add('close-icon');
  newInput.type = 'checkbox';
  newInput.id = timeStamp;
  newLabel.htmlFor = timeStamp;
  newLabel.textContent = task;
  newTask.append(newInput);
  newTask.append(newLabel);
  newTask.append(newImg);
  todoListElement.append(newTask);
};

filterClearElement.addEventListener('click', () => {
  document.querySelectorAll(':checked').forEach(item => item.parentElement.remove());
});

todoListElement.addEventListener('change', e => {
  console.dir(e.target.checked);
});

todoListElement.addEventListener('click', e => {
  if (e.target.classList.contains('close-icon')) e.target.parentElement.remove();
  else return;
});

formElement.addEventListener('submit', e => {
  e.preventDefault();
  createTask(formInputElement.value);
});
