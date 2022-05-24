// Подгружаем модуль пула
const pool = require("../data/config.js");

const router = app => {

    // GET-запросы
    app.get('/', (request, response) => {
        
        response.sendFile('src/index.html', null, (error) => {
            if (error) throw error;
        });
    });

    app.get('/main', (request, response) => {

        pool.query(`SELECT * FROM users`, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // POST-запросы
    app.post('/', (request, response) => {

    });

    // PUT-запросы
    app.put('/', (request, response) => {

    });

    // DELETE-запросы
    app.delete('/', (request, response) => {

    });
}

module.exports = router;