function openMenu(){
    const menuButton = document.querySelector('.menu');
    const list = document.querySelector('.list');
    const background = document.querySelector('.background');

    list.style.display = 'flex';

    const menuStyle = getComputedStyle(menuButton);

    list.style.top = 25 + parseInt(menuButton.offsetHeight) + 'px';
    list.style.left = parseInt(menuStyle.marginLeft) + parseInt(menuButton.offsetWidth) + 'px';

    document.body.style.overflow = "hidden";
    document.body.style.backdropFilter = "brightness(50%)";
    background.style.filter = "brightness(50%)";
}

export default openMenu