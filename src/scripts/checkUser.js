import renderUserInfo from "./renderUserInfo.js";
import getMyCars from './getMyCars.js';

import host from "../config/host.js";

function checkUser(){
    async function userRequest(){
        let token = localStorage.getItem('token');
        let response = await fetch(`${host}get-user`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': `Bearer ${token}`
            },
            body:JSON.stringify({})
        });

        let json = await response.json();

        if (json.error == true){
            if (location.href == `${host}myCars/myCars.html`){
                alert('Войдите, чтобы видеть свои автомобили');
                const panel = document.querySelector(".panel");
                panel.style.display = "none";
            }
            console.log(json.message);
        }else{
            let user = json.user;
            renderUserInfo(user);

            if (location.href == `${host}myCars/myCars.html`){
                const panel = document.querySelector(".panel");
                panel.style.display = "flex";
                getMyCars(user.id);
            }
        }
    }
    userRequest();
}

checkUser();

export default checkUser