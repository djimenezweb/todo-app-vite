const itemsLeftElement = document.getElementById('itemsLeft');

const activateFilter = filter => {
  document.querySelector('.filter__item--active').classList.remove('filter__item--active');
  filter.classList.add('filter__item--active');
};

const printItemsLeft = () => {
  itemsLeftElement.textContent = allTasks.filter(item => !item.checked).length + ' ';
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

export { activateFilter, printItemsLeft, deleteTask, updateCheck };
