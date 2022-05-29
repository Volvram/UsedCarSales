function openModalWindow(modalWindow){
    const background = document.querySelector('.background');

    modalWindow.style.display = "flex";
    modalWindow.style.justifyContent = "space-between";
    modalWindow.style.alignItems = "center";
    modalWindow.style.flexDirection = "column";

    document.body.style.overflow = "hidden";
    background.style.filter = "brightness(50%)";
}

export default openModalWindow