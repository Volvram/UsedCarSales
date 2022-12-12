import host from "../config/host.js";

async function userRequest () {
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

    if (json.error == true) {
        
    } else {
        return new Promise((resolve, reject) => {
            resolve(json.user);
        })
    }
}

export default userRequest;