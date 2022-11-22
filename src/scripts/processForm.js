import sendLoginRequest from "./sendLoginRequest.js";
import sendRegisterRequest from "./sendRegisterRequest.js";
import sendUserEditRequest from "./sendUserEditRequest.js";
import closeModalWindow from "./closeModalWindow.js";
import checkUser from "./checkUser.js";
import sendCarAddRequest from "./sendCarAddRequest.js";

function processForm(){
    // Sign in
    const signIn = document.querySelector('.sign-in');
    const signInForm = document.querySelector('.sign-in-form>form');
    const signInInputs = document.querySelectorAll('.sign-in-input');
    // Sign up
    const signUp = document.querySelector('.sign-up');
    const signUpForm = document.querySelector('.sign-up-form>form');
    const signUpInputs = document.querySelectorAll('.sign-up-input');
    // Profile
    const profile = document.querySelector('.profile');
    const profileForm = document.querySelector('.profile-form>form');
    const profileInputs = document.querySelectorAll('.profile-input');
    // Add advert
    const addCar = document.querySelector('.add-car');
    const addCarForm = document.querySelector('.add-car-form>form');
    const addCarInputs = document.querySelectorAll('.add-car-input');

    // Processing login form
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let link = event.target.action;
        let sendingObject = {};

        signInInputs.forEach((input, index) => {
            if (input.value == '' && input.name != 'patronymic'){
                sendingObject[input.name] = null;
            }else{
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
            if (input.value == '' && input.name != 'patronymic'){
                sendingObject[input.name] = null;
            }else{
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

    // Processing profile form
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let link = event.target.action;
        let sendingObject = {};

        profileInputs.forEach((input, index) => {
            if (input.value != '' || input.name == 'patronymic'){
                sendingObject[input.name] = input.value;
            }
        });

        sendUserEditRequest(link, sendingObject)
        .then((response) => {
            alert(response.message);
            location.reload();
        }, (response) => {
            alert(response.message);
        });
    })

    // ДОРАБОТАТЬ
    addCarForm.addEventListener('submit', (event) => {
        event.preventDefault();

        async function userRequest(){
            let token = localStorage.getItem('token');
            let response = await fetch('http://localhost:3210/get-user', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${token}`
                },
                body:JSON.stringify({})
            });
    
            let json = await response.json();

            if (json.error == true){
                console.log(json.message);
            } else {
                const user = json.user;

                // Request link
                let link = event.target.action;

                // Creating sending object
                const formdata = new FormData();
                formdata.append("owner_id", user.id);
                addCarInputs.forEach(input => {
                    if (input.name === "photo") {
                        formdata.append("file", input.files[0]);
                    }else {
	                    formdata.append(input.name, input.value);
                    }
                });

                // ДОДЕЛАТЬ ПРОВЕРКУ ДАННЫХ
                let empty = false;
                for (let [key, value] of formdata.entries()) {
                    if (!value) {
                        empty = true;
                    }
                }

                if (empty) {
                    alert("Заполните пустые поля");
                }

                // СДЕЛАТЬ БЭК
                sendCarAddRequest(link, formdata)
                .then((response) => {
                    alert(response.message);
                    closeModalWindow(addCar);
                }, (response) => {
                    alert(response.message);
                });
            }
        }
        userRequest();
    })
}

processForm();