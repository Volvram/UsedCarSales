import sendLoginRequest from "./sendLoginRequest.js";
import sendRegisterRequest from "./sendRegisterRequest.js";

function processForm(){
    const signInForm = document.querySelector('.sign-in-form>form');
    const signInInputs = document.querySelectorAll('.sign-in-input');
    const signUpForm = document.querySelector('.sign-up-form>form');
    const signUpInputs = document.querySelectorAll('.sign-up-input');

    // Processing login form
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let link = event.target.action;
        let sendingObject = {};

        signInInputs.forEach((input, index) => {
            sendingObject[input.name] = input.value;
        });

        sendLoginRequest(link, sendingObject)
        .then((response) => {
            console.log(response);
        }, (response) => {
            console.log(response.msg);
        });

    });

    // Processing register form
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let link = event.target.action;
        let sendingObject = {};

        signUpInputs.forEach((input, index) => {
            sendingObject[input.name] = input.value;
        });

        sendRegisterRequest(link, sendingObject)
        .then((response) => {
            console.log(response.msg);
        }, (response) => {
            console.log(response.msg);
        });

    });
}

processForm();