async function sendCarAddRequest(link, data) {
    const response = await fetch(`${link}`, {
        method: 'POST',
        headers: {
			'Accept': 'application/json',
		},
        body: data,
    });
    
    const json = await response.json();
    return new Promise((resolve, reject) => {
        if (!json.error) {
            resolve(json);
        } else {
            reject(json);
        }
    });
}

export default sendCarAddRequest;