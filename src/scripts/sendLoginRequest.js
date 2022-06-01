async function sendLoginRequest(link, sendingBody){

    let response = await fetch(`${link}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendingBody)
    });
    let json = await response.json();

    return new Promise((resolve, reject) => {
        if ('user' in json){
            resolve(json);
        }else{
            reject(json);
        }
    });
};

export default sendLoginRequest;