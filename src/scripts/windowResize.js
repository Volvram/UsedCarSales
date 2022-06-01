function windowResize(){
    const signInExit = document.querySelector('.sign-in-exit');
    const signUpExit = document.querySelector('.sign-up-exit');

    window.addEventListener('resize', (event) => {
        if (window.outerWidth <= '1100'){
            //correct exit button
            signInExit.style.paddingTop = '1.5%';
            signInExit.style.paddingLeft = '1.5%';
            signInExit.style.paddingRight = '1.5%';
            signInExit.style.paddingBottom = '1.5%';

            signUpExit.style.paddingTop = '1.5%';
            signUpExit.style.paddingLeft = '1.5%';
            signUpExit.style.paddingRight = '1.5%';
            signUpExit.style.paddingBottom = '1.5%';
        }else{
            signInExit.style.paddingTop = '1%';
            signInExit.style.paddingLeft = '1%';
            signInExit.style.paddingRight = '1%';
            signInExit.style.paddingBottom = '1%';

            signUpExit.style.paddingTop = '1%';
            signUpExit.style.paddingLeft = '1%';
            signUpExit.style.paddingRight = '1%';
            signUpExit.style.paddingBottom = '1%';
        }
    });
}
windowResize();