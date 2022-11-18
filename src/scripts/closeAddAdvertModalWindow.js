function closeModalWindow(modalWindow){
    const background = document.querySelector('.background');

    modalWindow.style.display = "none";

    document.body.style.overflow = "";
    document.body.style.backdropFilter = "brightness(100%)";
    background.style.filter = "brightness(100%)";
}

export default closeModalWindow