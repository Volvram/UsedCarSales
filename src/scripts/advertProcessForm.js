import userRequest from "./userRequest.js";
import sendCarAddRequest from "./sendCarAddRequest.js";

function advertProcessForm() {
    // Add advert
    const addCar = document.querySelector('.add-car');
    const addCarForm = document.querySelector('.add-car-form>form');
    const addCarInputs = document.querySelectorAll('.add-car-input');

    addCarForm.addEventListener('submit', (event) => {
        event.preventDefault();

        userRequest()
        .then(user => {
            // Request link
            let link = event.target.action;

            // Creating sending object
            const formdata = new FormData();
            formdata.append("owner_id", user.id);
            addCarInputs.forEach(input => {
                if (input.name === "photo") {
                    formdata.append("file", input.files[0]);
                } else {
                    formdata.append(input.name, input.value);
                }
            });

            let empty = false;
            let wrong = false;
            for (let [key, value] of formdata.entries()) {
                let val;

                if (typeof value == "string") {
                    val = value.toLowerCase();
                }else {
                    val = value;
                }
                
                if (!value) {
                    empty = true;
                    break;
                } else if ((key === "type" && (val != "легковой автомобиль" && val != "грузовой автомобиль"))
                            || (key === "body" && (val != "седан" && val != "купе" && val != "пикап" && val != "внедорожник" && val != "универсал" && val != "минивэн")
                            || (key === "transmission" && (val!= "механическая" && val != "автоматическая" && val != "роботизированная"))
                            || (key === "drive_unit" && (val != "передний" && val != "задний" && val != "полный"))
                            || (key === "steering_wheel" && (val !== "левый" && val != "правый"))
                            || (key === "fuel_type" && (val != "бензин" && val != "дизель")))) {
                    wrong = true;
                    break;
                }
            }

            if (empty) {
                alert("Заполните пустые поля");
            } else if (wrong) {
                alert("Неверные данные (в полях, где есть примеры в скобках должно быть одно из указанных значений)");
            } else {
                // sending car data to save in database
                sendCarAddRequest(link, formdata)
                .then((response) => {
                    alert(response.message);
                    // closeModalWindow(addCar);
                    location.reload();
                }, (response) => {
                    alert(response.message);
                });
            }
        });
    })
}

advertProcessForm();