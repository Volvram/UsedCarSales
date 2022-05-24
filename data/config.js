const mysql = require("mysql");  //Подключаем модуль mySQL

// Создаём объект конфигурации подключения к БД
const config = {
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'used_car_sales'
}

// Создаём пул для множества подключений одновременно
const pool = mysql.createPool(config);

//  Экспортируем пул
module.exports = pool;