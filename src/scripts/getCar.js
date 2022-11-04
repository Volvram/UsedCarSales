import renderCar from "./renderCar.js";

function getCar() {
    const id = window.location.href.split("?")[1].split("=")[1];

    (async () => {
        let response = await fetch(`http://localhost:3210/getCar?id=${id}`);
        let json = await response.json();

        return new Promise((resolve, reject) => {
            if ('data' in json){
                resolve(json);
            }else{
                reject(json);
            }
        });
    })()
    .then(response => {
        renderCar(response.data);
    }, (response) => {
        alert(response.message)
    });
}

getCar();