import sendLoginRequest from "./sendLoginRequest.js";
import sendRegisterRequest from "./sendRegisterRequest.js";
import closeModalWindow from "./closeModalWindow.js";
import checkUser from "./checkUser.js";

function processForm(){
    // Sign in
    const signIn = document.querySelector('.sign-in');
    const signInForm = document.querySelector('.sign-in-form>form');
    const signInInputs = document.querySelectorAll('.sign-in-input');
    // Sign up
    const signUp = document.querySelector('.sign-up');
    const signUpForm = document.querySelector('.sign-up-form>form');
    const signUpInputs = document.querySelectorAll('.sign-up-input');

    // Processing login form
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let link = event.target.action;
        let sendingObject = {};

        signInInputs.forEach((input, index) => {
            if (input.value != ''){
                sendingObject[input.name] = input.value;
            }
        });

        sendLoginRequest(link, sendingObject)
        .then((response) => {
            closeModalWindow(signIn);
            localStorage.setItem('token', response.token);
            checkUser();
        }, (response) => {
            alert(response.message);
        });

    });

    // Processing register form
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let link = event.target.action;
        let sendingObject = {};

        signUpInputs.forEach((input, index) => {
            if (input.value != ''){
                sendingObject[input.name] = input.value;
            }
        });

        sendRegisterRequest(link, sendingObject)
        .then((response) => {
            closeModalWindow(signUp);
            alert(response.message);
        }, (response) => {
            alert(response.message);
        });

    });
}

processForm();