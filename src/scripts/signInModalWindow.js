function signInModalWindow(){
    const signInButton = document.querySelector('.sign-in-button');
    const signIn = document.querySelector('.sign-in');
    const signInExit = document.querySelector('.sign-in-exit');
    const background = document.querySelector('.background');

    signInButton.addEventListener('click', (event) => {
        signIn.style.display = "flex";
        signIn.style.justifyContent = "space-between";
        signIn.style.alignItems = "center";
        signIn.style.flexDirection = "column";

        signInExit.style.display = "flex";
        signInExit.style.alignSelf = "flex-end"
        signInExit.style.borderRadius = '1px';

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

        document.body.style.overflow = "hidden";
        background.style.filter = "brightness(50%)";

    });

    signInExit.addEventListener('click', (event) => {
        signIn.style.display = "none";
        signInExit.style.display = "none";

        document.body.style.overflow = "";
        background.style.filter = "brightness(100%)";
    });
}

signInModalWindow();