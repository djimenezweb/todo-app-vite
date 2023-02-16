import '../scss/styles.scss';

const LS = localStorage;
const formElement = document.getElementById('form');
const formInputElement = document.getElementById('form__input');
const todoListElement = document.getElementById('todo-list');
const filterClearElement = document.getElementById('filter__clear');
const filterAllElement = document.getElementById('filter__all');
const filterActiveElement = document.getElementById('filter__active');
const filterCompletedElement = document.getElementById('filter__completed');
const itemsLeftElement = document.getElementById('itemsLeft');
const toggleModeElement = document.getElementById('toggle-mode');

//let allTasks = [];
let allTasks = JSON.parse(LS.getItem('localStorage'));
let activeTasks = [];

let completedTasks = [];

// FUNCIONES

const activateFilter = filter => {
  document.querySelector('.filter__item--active').classList.remove('filter__item--active');
  filter.classList.add('filter__item--active');
};

const updateLocalStorage = () => {
  LS.clear();
  LS.setItem('localStorage', JSON.stringify(allTasks));
  console.log(LS);
};

const printItemsLeft = () => {
  itemsLeftElement.textContent = allTasks.filter(item => !item.checked).length + ' ';
};

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
    newInput.checked = item.checked;
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
  printItemsLeft();
};

const createObject = task => {
  const timeStamp = Date.now();
  const newObject = {};
  newObject.id = timeStamp;
  newObject.task = task;
  newObject.checked = false;
  allTasks.push(newObject);
  createFragment(allTasks);
  updateLocalStorage();
};

const deleteTask = id => {
  const filteredArray = allTasks.filter(item => item.id !== id);
  allTasks = filteredArray;
  createFragment(allTasks);
  updateLocalStorage();
};

const updateCheck = id => {
  allTasks.forEach(item => {
    if (item.id === Number(id)) item.checked = !item.checked;
  });
  printItemsLeft();
  updateLocalStorage();
};

const clearCompleted = () => {
  const filteredArray = allTasks.filter(item => !item.checked);
  allTasks = filteredArray;
  createFragment(allTasks);
  updateLocalStorage();
};

/* const filterActive = () => {
  const filteredArray = allTasks.filter(item => !item.checked);
  activeTasks = filteredArray;
  createFragment(activeTasks);
};

const filterCompleted = () => {
  const filteredArray = allTasks.filter(item => item.checked);
  completedTasks = filteredArray;
  createFragment(completedTasks);
}; */

const filter = (status, array) => {
  const filteredArray = allTasks.filter(item => item.checked === status);
  array = filteredArray;
  createFragment(array);
};

// EVENTOS

filterClearElement.addEventListener('click', () => {
  clearCompleted();
  //filter(false, allTasks);
});

filterCompletedElement.addEventListener('click', () => {
  //filterCompleted();
  activateFilter(filterCompletedElement);
  filter(true, completedTasks);
});

filterActiveElement.addEventListener('click', () => {
  //filterActive();
  activateFilter(filterActiveElement);
  filter(false, activeTasks);
});

filterAllElement.addEventListener('click', () => {
  activateFilter(filterAllElement);
  createFragment(allTasks);
});

todoListElement.addEventListener('click', e => {
  if (e.target.classList.contains('close-icon')) deleteTask(Number(e.target.previousSibling.htmlFor));
});

todoListElement.addEventListener('change', e => {
  updateCheck(e.target.id);
});

formElement.addEventListener('submit', e => {
  e.preventDefault();
  if (formInputElement.value !== '') createObject(formInputElement.value);
  formInputElement.value = '';
});

toggleModeElement.addEventListener('click', () => {
  if (toggleModeElement.dataset.icon === 'moon') {
    toggleModeElement.src = 'assets/images/icon-sun.svg';
    toggleModeElement.dataset.icon = 'sun';
    LS.setItem('mode', 'dark');
    console.log(LS);
  } else {
    toggleModeElement.src = 'assets/images/icon-moon.svg';
    toggleModeElement.dataset.icon = 'moon';
    LS.setItem('mode', 'light');
    console.log(LS);
  }
  document.body.classList.toggle('dark');
});

if (allTasks) createFragment(allTasks);
else {
  allTasks = [];
  LS.setItem('localStorage', '[]');
}
printItemsLeft();
console.log(allTasks);
