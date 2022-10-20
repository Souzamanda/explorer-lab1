import "./css/index.css"

const darkButton = document.querySelector('#dark');
const lightButton = document.querySelector('#light');
const ccBg = document.querySelector('.cc-bg');

const setDarkMode = () => {
  document.querySelector('body').classList = 'dark';
}

const setLightMode = () => {
  document.querySelector('body').classList = 'light';
}

//logic to make theme change when button is clicked
const radioButtons = document.querySelectorAll(".toggle-wrapper input")
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('click', (event) => {
    if (darkButton.checked) {
      localStorage.setItem('colorMode', 'dark')
      setDarkMode();
    } else {
      localStorage.setItem('colorMode', 'light');
      setLightMode();
    }
  })
}

//logic to store the user preference and check it every time app is reloaded
export const setColorMode = () => {
  console.log('setColorMode');
  console.log(localStorage.getItem('colorMode'));
  if (localStorage.getItem('colorMode') == 'dark') {
    setDarkMode();
    darkButton.click();
  } else if (localStorage.getItem('colorMode') == 'light') {
    setLightMode();
    lightButton.click();
  }
}

export const checkMode = () => {
  if(localStorage.getItem('colorMode') == null) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      lightButton.click();
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkButton.click();
    }
  }
}

