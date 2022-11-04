function renderCars(carsInfo, place){

    carsInfo.forEach((car, index) => {

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

        // render car card
        let card = document.createElement('div');
        card.classList.add("col-lg-4");
        card.classList.add("col-md-6");
        card.classList.add("col-xs-12");

        card.innerHTML = `<div class="car-choice">
                                <a href="../carPage/carPage.html?id=${car.id}">
                                    <div class="car-photo" id="${car.id}"><img src="${car.photo}"></div>
                                    <div class="car-description">
                                        <div class="car-mark">${car.mark}</div>
                                        <div class="car-model">${car.model}</div>
                                    </div>
                                    <div class="car-price">${resultPrice} ₽</div>
                                </a>
                            </div>`;

        place.append(card);

        // let carPhoto = document.querySelector(`.car-photo[id='${car.id}']`);
        // carPhoto.style.backgroundImage = `url('${car.photo}')`;
        // carPhoto.style.backdropFilter = `blur(20px)`;
    });

}
export default renderCars;