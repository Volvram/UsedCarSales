import renderUserInfo from "./renderUserInfo.js";

function checkUser(){
    async function userRequest(){
        let token = localStorage.getItem('token');
        let response = await fetch('http://localhost:3210/get-user', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': `Bearer ${token}`
            },
            body:JSON.stringify({})
        });

        let json = await response.json();

        if (json.error == true){
            console.log(json.message);
        }else{
            let user = json.user;
            renderUserInfo(user);
        }
    }
    userRequest();
}

checkUser();

export default checkUser