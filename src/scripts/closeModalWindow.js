function closeModalWindow(modalWindow){
    const background = document.querySelector('.background');

    modalWindow.style.display = "none";

    document.body.style.overflow = "";
    background.style.filter = "brightness(100%)";
}

export default closeModalWindow