function renderCar(carInfo) {
    const car = carInfo[0];
    const place = document.querySelector(".content");

    let info = document.createElement('div');

    // Making nice form for price
    let price = String(car.price).split('');
    let resultPrice = [];
    let counter = 0;
    for (let i = price.length - 1; i >= 0; i--){
        if (counter == 3){
            resultPrice.unshift(' ');
            counter = 0;
        }
        counter++;
        resultPrice.unshift(price[i]);
    }
    resultPrice = resultPrice.join('');

    // Here is render all the info about car
    info.innerHTML = `<div class="content-title">
                            <div class="content-title-mark">${car.mark}</div>
                            <div class="content-title-model">${car.model}</div>
                        </div>
                        <div class="content-price">${resultPrice} ₽</div>
                        <div class="content-image"><img src="${car.photo}"></div>
                    `;

    place.append(info);
}

export default renderCar;