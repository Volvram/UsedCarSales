function windowResize(){
    const signInExit = document.querySelector('.sign-in-exit');

    window.addEventListener('resize', (event) => {
        if (window.outerWidth <= '1100'){
            signInExit.style.paddingTop = '3%';
            signInExit.style.paddingLeft = '3%';
            signInExit.style.paddingRight = '3%';
            signInExit.style.paddingBottom = '3%';
        }else{
            signInExit.style.paddingTop = '1%';
            signInExit.style.paddingLeft = '1%';
            signInExit.style.paddingRight = '1%';
            signInExit.style.paddingBottom = '1%';
        }
        console.log(window.outerWidth);
    });
}
windowResize();