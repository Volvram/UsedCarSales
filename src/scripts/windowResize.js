import closeMenu from "./closeMenu.js";
import clickOutsideMenu from "./clickOutsideMenu.js";

function windowResize(){
    // Login and register exit buttons
    const signInExit = document.querySelector('.sign-in-exit');
    const signUpExit = document.querySelector('.sign-up-exit');

    // Menu list location
    const menuButton = document.querySelector('.menu');
    const list = document.querySelector('.list');

    window.addEventListener('resize', (event) => {
        // correct menu list location
        const menuStyle = getComputedStyle(menuButton);
        list.style.left = parseInt(menuStyle.marginLeft) + 'px';

        if (menuStyle.display == 'none'){
            document.removeEventListener('click', clickOutsideMenu);
            closeMenu();
        }
    });
}
windowResize();