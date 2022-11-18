import closeModalWindow from "./closeModalWindow.js";
import openAddAdvertModalWindow from "./openAddAdvertModalWindow.js";

function addAdvertModalWindow(){
    const addAdvert = document.querySelector('.add-advert');
    const addCar = document.querySelector('.add-car');
    const addCarExit = document.querySelector('.add-car-exit');
    const profile = document.querySelector('.profile');

    // Sign in button in navigation
    addAdvert.addEventListener('click', (event) => {
        closeModalWindow(profile);
        openAddAdvertModalWindow(addCar);
    });
    
    // Exit sign in
    addCarExit.addEventListener('click', (event) => {
        closeModalWindow(addCar);
    });
}

addAdvertModalWindow();