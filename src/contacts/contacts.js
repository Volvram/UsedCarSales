function signIn(){
    const signInButton = document.querySelector('.sign-in-button');
    const signIn = document.querySelector('.sign-in');
    const signInExit = document.querySelector('.sign-in-exit');

    signInButton.addEventListener('click', (event) => {
        signIn.style.display = "flex";
        signIn.style.justifyContent = "space-between";
        signIn.style.alignItems = "center";
        signIn.style.flexDirection = "column";

        signInExit.style.display = "flex";
        signInExit.style.alignSelf = "flex-end"
        signInExit.style.borderRadius = '6px';
        signInExit.style.paddingTop = 2 + '%';
        signInExit.style.paddingRight = 1 + '%';
        signInExit.style.paddingBottom = 2 + '%';
        signInExit.style.paddingLeft = 1 + '%';
    });

    signInExit.addEventListener('click', (event) => {
        signIn.style.display = "none";
        signInExit.style.display = "none";
    });



    if (window.outerWidth <= '1100'){
        signInExit.innerHTML = 'X';
    }
    console.log(window.outerWidth);
}

signIn();