function closeMenu(){
    const list = document.querySelector('.list');
    const background = document.querySelector('.background');

    list.style.display = 'none';

    document.body.style.overflow = "";
    document.body.style.backdropFilter = "brightness(100%)";
    background.style.filter = "brightness(100%)";
}

export default closeMenu