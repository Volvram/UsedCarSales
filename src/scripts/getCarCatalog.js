import renderCars from "./renderCars.js";

function getCarCatalog(){
    const carChoices = document.querySelector('.car-choices');

    async function getCars(){
        let response = await fetch('http://localhost:3210/getCarCatalog');
        let json = await response.json();

        return new Promise((resolve, reject) => {
            if ('data' in json){
                resolve(json);
            }else{
                reject(json);
            }
        });
    }

    getCars()
    .then((response) => {
        renderCars(response.data, carChoices);
    }, (response) => {
        alert(response.message)
    });
}
getCarCatalog();