import "./css/index.css"

const darkButton = document.querySelector('#dark');
const lightButton = document.querySelector('#light');

const setDarkMode = () => {
  document.querySelector('body').classList = 'dark';
}

export const setLightMode = () => {
  document.querySelector('body').classList = 'light';
}

