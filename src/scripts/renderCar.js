import sendCarDeleteRequest from "./sendCarDeleteRequest.js";
import userRequest from "./userRequest.js";

function renderCar(carInfo) {
    const car = carInfo[0];

    let content = document.querySelector(".content");

    const costFormatter = Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",

        maximumFractionDigits: 0
    });

    const tax = costFormatter.format(car.tax);

    const resultPrice = costFormatter.format(car.price);

    const numberFormatter = Intl.NumberFormat("ru-Ru", {
        maximumFractionDigits: 0
    })

    const mileage = numberFormatter.format(car.mileage);

    const tel = car.tel.substr(0,1) + ' (' + car.tel.substr(1, 3) + ') ' + car.tel.substr(4, 3) + '-' + car.tel.substr(7,2) + '-' + car.tel.substr(9,2);

    // Here is render all the info about car
    content.innerHTML = `  <div class="content-title">
                            <div class="content-title-mark">${car.mark}</div>
                            <div class="content-title-model">${car.model}</div>
                            <div class="content-title-price">${resultPrice}</div>
                        </div>
                        <div class="content-body">
                            <img src="${car.photo}" class="content-image">
                            <div class="content-characteristics">
                                <div class="content-characteristic">
                                    <div class="label">Тип</div>
                                    <div class="value">${car.type}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Год выпуска</div>
                                    <div class="value">${car.manufacture_year}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Пробег</div>
                                    <div class="value">${mileage} Км</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Кузов</div>
                                    <div class="value">${car.body}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Цвет</div>
                                    <div class="value">${car.color}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Годовой налог</div>
                                    <div class="value">${tax}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Коробка передач</div>
                                    <div class="value">${car.transmission}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Привод</div>
                                    <div class="value">${car.drive_unit}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Руль</div>
                                    <div class="value">${car.steering_wheel}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Количество владельцев</div>
                                    <div class="value">${car.owners_number}</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Объём двигателя</div>
                                    <div class="value">${car.volume} л</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Мощность двигателя</div>
                                    <div class="value">${car.power} л.с.</div>
                                </div>
                                <div class="content-characteristic">
                                    <div class="label">Тип топлива</div>
                                    <div class="value">${car.fuel_type}</div>
                                </div>
                            </div>
                        </div>
                        <div class="content-phone">
                            Телефон владельца:
                            <a href="tel:${car.tel}">
                                ${tel}
                            </a>
                        </div>
                    `;
    userRequest()
    .then(user => {
        if (user && car.owner_id == user.id) {
            const contentPhone = document.querySelector(".content-phone");
            let deleteButton = document.createElement('button');
            deleteButton.classList.add("delete-car-button");
            deleteButton.innerText = "Удалить объявление";
            contentPhone.after(deleteButton);

            deleteButton.addEventListener('click', (event) => {
                const del = confirm("Уверены, что хотите удалить объявление? Изменения необратимы.");
                if (del) {
                    sendCarDeleteRequest(car.id);
                }
            });
        }
    });
    
}

export default renderCar;