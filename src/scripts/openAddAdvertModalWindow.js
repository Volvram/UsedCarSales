function openModalWindow(modalWindow){
    const background = document.querySelector('.background');
    const id = document.querySelector('.fields-container-id');

    modalWindow.style.display = "flex";

    document.body.style.backdropFilter = "brightness(50%)";
    background.style.filter = "brightness(50%)";
}

export default openModalWindow