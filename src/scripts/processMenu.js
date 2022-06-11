import openMenu from "./openMenu.js";
import closeMenu from "./closeMenu.js";
import clickOutsideMenu from "./clickOutsideMenu.js";
import closeModalWindow from "./closeModalWindow.js";

function processMenu(){
    const menuButton = document.querySelector('.menu');
    const list = document.querySelector('.list');

    // Login and register
    const signIn = document.querySelector('.sign-in');
    const signUp = document.querySelector('.sign-up');

    const profile = document.querySelector('.profile');

    let listStyle = getComputedStyle(list);

    menuButton.addEventListener('click', (event) => {
        if (listStyle.display == 'none'){
            // Closing modal windows
            closeModalWindow(signIn);
            closeModalWindow(signUp);
            closeModalWindow(profile);

            document.addEventListener('click', clickOutsideMenu);
            openMenu();
        }else if (listStyle.display == 'flex'){
            document.removeEventListener('click', clickOutsideMenu);
            closeMenu();
        }
    });
}

processMenu();