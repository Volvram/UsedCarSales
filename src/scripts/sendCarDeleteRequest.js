import host from "../config/host.js";

async function sendCarDeleteRequest(id) {
    const response = await fetch(`${host}deleteCar/${id}`, {
        method: 'DELETE',
    });
    
    const json = await response.json();
    return new Promise((resolve, reject) => {
        if (!json.error) {
            alert(json.message);
            location.href=`${host}myCars/myCars.html`;
        } else {
            alert(json.message);
        }
    });
}

export default sendCarDeleteRequest;