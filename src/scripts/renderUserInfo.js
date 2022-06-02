function renderUserInfo(user){
    const userInfo = document.querySelector('.user-info');
    const signInButton = document.querySelector('.sign-in-button');

    signInButton.style.display = 'none';

    const info = document.createElement('div');
    info.style.background = '#10101f25'
    info.style.color = '#ffffff';
    info.style.fontSize = '22px';
    info.innerHTML = user.name;

    userInfo.append(info);
}
export default renderUserInfo