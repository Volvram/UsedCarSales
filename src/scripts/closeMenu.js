function closeMenu(){
    const list = document.querySelector('.list');
    const background = document.querySelector('.background');

    // For checking modal windows
    const signIn = document.querySelector('.sign-in');
    const signUp = document.querySelector('.sign-up');
    const profile = document.querySelector('.profile');

    // Getting styles of the modal windows
    let signInStyle = getComputedStyle(signIn);
    let signUpStyle = getComputedStyle(signUp);
    let profileStyle = getComputedStyle(profile);

    list.style.display = 'none';

    if (signInStyle.display == 'none' && signUpStyle.display == 'none' && profileStyle.display == 'none'){
        document.body.style.overflow = "";
        document.body.style.backdropFilter = "brightness(100%)";
        background.style.filter = "brightness(100%)";
    }
}

export default closeMenu