// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Dark/light mode
// Get currently stored theme
let theme = localStorage.getItem("theme");

// No or invalid theme stored
if ((theme == null) || ((theme != "light") && (theme != "dark"))) {
    theme = "dark"
    window.localStorage.setItem("theme", theme)
}

// Get theme switch button
const themeButton = document.getElementById("theme-switch");

// Enable dark mode function
function enableDarkMode() {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    window.localStorage.setItem("theme", "dark");
    themeButton.innerText = "Enable light mode";
}

// Enable light mode function
function enableLightMode() {
    document.documentElement.setAttribute("data-bs-theme", "light");
    window.localStorage.setItem("theme", "light");
    themeButton.innerText = "Enable dark mode";
}

// Set theme
if (theme == "dark") {
    enableDarkMode();
} else {
    enableLightMode();
}

// Change theme button
themeButton.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-bs-theme") == "light") {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});
