import openModalWindow from "./openModalWindow.js";
import closeModalWindow from "./closeModalWindow.js";

function renderUserInfo(user){
    const userInfo = document.querySelector('.user-info');
    const signInButton = document.querySelector('.sign-in-button');

    const profile = document.querySelector('.profile');
    const profileExit = document.querySelector('.profile-exit');
    const profileDelete = document.querySelector('.profile-delete');

    signInButton.style.display = 'none';

    // User button
    const userButton = document.createElement('button');
    userButton.classList.add('user-button');
    userButton.style.background = '#10101f25'
    userButton.style.color = '#ffffff';
    userButton.style.border = '0px';
    userButton.style.cursor = 'pointer';
    userButton.style.fontSize = '22px';
    userButton.innerHTML = user.name;

    userInfo.append(userButton);

    // Open profile
    userButton.addEventListener('click', (event) => {
        openModalWindow(profile);
        // Далее нужен запрос данных из БД для отображения...

    });

    // Exit profile
    profileExit.addEventListener('click', (event) => {
        closeModalWindow(profile);
    });

    // Delete profile button
    profileDelete.addEventListener('click', (event) => {
        let del = confirm('Подтвердить удаление аккаунта');
        if (del){
            // Далее удалить аккаунт из БД...

        }
    });


    // Logout button
    const logoutButton = document.createElement('button');
    logoutButton.classList.add('logout-button');
    logoutButton.style.background = '#10101f25'
    logoutButton.style.color = '#ffffff';
    logoutButton.style.border = '0px';
    logoutButton.style.cursor = 'pointer';
    logoutButton.style.fontSize = '22px';
    logoutButton.innerHTML = 'Выйти';

    userInfo.append(logoutButton);

    logoutButton.addEventListener('click', (event) => {
        let exit = confirm('Подтвердить выход из аккаунта');
        if (exit){
            localStorage.removeItem('token');
            location.reload();
        }
    });
}
export default renderUserInfo