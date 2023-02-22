import '../scss/styles.scss';
import IconCross from '../assets/images/icon-cross.svg';
import IconMoon from '../assets/images/icon-moon.svg';
import IconSun from '../assets/images/icon-sun.svg';

// CONSTANTES

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

// VARIABLES

let isDarkSelected = LS.getItem('dark');
let allTasks = JSON.parse(LS.getItem('localStorage'));
let activeTasks = [];
let completedTasks = [];

// FUNCIONES

const activateFilter = filter => {
  document.querySelector('.filter__item--active').classList.remove('filter__item--active');
  filter.classList.add('filter__item--active');
};

const updateLocalStorage = () => {
  LS.setItem('localStorage', JSON.stringify(allTasks));
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
    newImg.src = IconCross;
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

const filter = (status, array) => {
  const filteredArray = allTasks.filter(item => item.checked === status);
  array = filteredArray;
  createFragment(array);
};

// EVENTOS

filterClearElement.addEventListener('click', () => {
  clearCompleted();
});

filterCompletedElement.addEventListener('click', () => {
  activateFilter(filterCompletedElement);
  filter(true, completedTasks);
});

filterActiveElement.addEventListener('click', () => {
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

const disableDark = () => {
  document.body.classList.remove('dark');
  toggleModeElement.src = IconMoon;
  toggleModeElement.dataset.icon = 'moon';
  LS.setItem('dark', 'false');
};

const enableDark = () => {
  document.body.classList.add('dark');
  toggleModeElement.src = IconSun;
  toggleModeElement.dataset.icon = 'sun';
  LS.setItem('dark', 'true');
};

toggleModeElement.addEventListener('click', () => {
  toggleModeElement.dataset.icon === 'moon' ? enableDark() : disableDark();
});

isDarkSelected && enableDark();

if (allTasks) createFragment(allTasks);
else {
  allTasks = [];
  LS.setItem('localStorage', '[]');
}
printItemsLeft();
