import openModalWindow from "./openModalWindow.js";
import closeModalWindow from "./closeModalWindow.js";

function signUpModalWindow(){

    const signUpButton = document.querySelector('.sign-up-button');
    const signUp = document.querySelector('.sign-up');
    const signUpExit = document.querySelector('.sign-up-exit');
    const signIn = document.querySelector('.sign-in');

    // Sign up button in sign in modal window
    signUpButton.addEventListener('click', (event) => {
        openModalWindow(signUp);
        closeModalWindow(signIn);
    });
    
    // Exit sign in
    signUpExit.addEventListener('click', (event) => {
        closeModalWindow(signUp);
    });
}

signUpModalWindow();