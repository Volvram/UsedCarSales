function getUserData(){
    const main = document.querySelector('main');

    async function getData(){
        let response = await fetch('http://localhost:3210/main');
        let json = await response.json();

        // main.append(JSON.stringify(json));

    }

    getData();
}

getUserData();