import openModalWindow from "./openModalWindow.js";
import closeModalWindow from "./closeModalWindow.js";

function signInModalWindow(){

    const signInButton = document.querySelector('.sign-in-button');
    const signInModalButton = document.querySelector('.sign-in-modal-button');
    const signIn = document.querySelector('.sign-in');
    const signInExit = document.querySelector('.sign-in-exit');
    const signUp = document.querySelector('.sign-up');

    // Sign in button in navigation
    signInButton.addEventListener('click', (event) => {
        closeModalWindow(signUp);
        openModalWindow(signIn);
    });

    // Sign in button in sign up modal window
    signInModalButton.addEventListener('click', (event) => {
        closeModalWindow(signUp);
        openModalWindow(signIn);
    });
    
    // Exit sign in
    signInExit.addEventListener('click', (event) => {
        closeModalWindow(signIn);
    });
}

signInModalWindow();