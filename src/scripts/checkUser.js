function checkUser(){
    async function userRequest(){
        try{
            let response = await fetch('http://localhost:3210/get-user', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: `Bearer `
                },
                body:JSON.stringify({})
            });

            let json = await response.json();

            console.log(json);
        }catch(e){
            console.log(`Ошибка: ${e}`);
        }
        
    }
    userRequest();
}

checkUser();