function renderUserInfo(user){
    const userInfo = document.querySelector('.user-info');
    const signInButton = document.querySelector('.sign-in-button');

    signInButton.style.display = 'none';

    const info = document.createElement('button');
    info.style.background = '#10101f25'
    info.style.color = '#ffffff';
    info.style.border = '0px';
    info.style.cursor = 'pointer';
    info.style.fontSize = '22px';
    info.innerHTML = user.name;

    userInfo.append(info);
}
export default renderUserInfo