// Подключаем пакеты и порт (npm install body-parser express mysql)
const express = require("express");
const port = 3210;
const app = express();
const bodyParser = require("body-parser");  //Парсер запросов
const routes = require('./routes/routes.js');

// Используем хранение файлов для динамической отправки
app.use(express.static("src"));
app.use(express.static("src/mainPage"));
app.use(express.static("src/contacts"));
app.use(express.static("src/aboutCompany"));
app.use(express.static("src/scripts"));

// Парсим URL и объекты в json-формат
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Маршрутизируем запросы
routes(app);

// Старт сервера
const server = app.listen(port, (error) => {
    if (error){
        return console.log(`Error: ${error}`);
    }

    console.log(`
    -------------------------------------------
    -------------------------------------------
    Server listening on port ${server.address().port}
    URL: http://localhost:${port}
    -------------------------------------------
    -------------------------------------------`);
});