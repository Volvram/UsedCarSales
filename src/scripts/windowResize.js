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
        if (window.outerWidth <= '1100'){
            //correct exit button
            signInExit.style.paddingTop = '1.5%';
            signInExit.style.paddingLeft = '1.5%';
            signInExit.style.paddingRight = '1.5%';
            signInExit.style.paddingBottom = '1.5%';

            signUpExit.style.paddingTop = '1.5%';
            signUpExit.style.paddingLeft = '1.5%';
            signUpExit.style.paddingRight = '1.5%';
            signUpExit.style.paddingBottom = '1.5%';
        }else{
            //correct exit button
            signInExit.style.paddingTop = '1%';
            signInExit.style.paddingLeft = '1%';
            signInExit.style.paddingRight = '1%';
            signInExit.style.paddingBottom = '1%';

            signUpExit.style.paddingTop = '1%';
            signUpExit.style.paddingLeft = '1%';
            signUpExit.style.paddingRight = '1%';
            signUpExit.style.paddingBottom = '1%';
        }

        // correct menu list location
        const menuStyle = getComputedStyle(menuButton);
        list.style.left = parseInt(menuStyle.marginLeft) + parseInt(menuButton.offsetWidth) + 'px';

        if (menuStyle.display == 'none'){
            document.removeEventListener('click', clickOutsideMenu);
            closeMenu();
        }
    });
}
windowResize();