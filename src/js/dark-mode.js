import { LS } from './constants/localStorage';
const disableDark = element => {
  document.body.classList.remove('dark');
  element.src = 'assets/images/icon-moon.svg';
  element.dataset.icon = 'moon';
  LS.setItem('dark', 'false');
};

const enableDark = element => {
  document.body.classList.add('dark');
  element.src = 'assets/images/icon-sun.svg';
  element.dataset.icon = 'sun';
  LS.setItem('dark', 'true');
};

export { disableDark, enableDark };
