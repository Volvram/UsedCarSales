// Подгружаем модули
const pool = require("../data/config.js");  // Пул
const { signupValidation, loginValidation } = require('../validation.js');  // Валидаторы регистрации и входа
const { validationResult } = require('express-validator');  // Результат проверки валидности
const bcrypt = require('bcryptjs');  // Хэширование паролей
const jwt = require('jsonwebtoken');  // Json-web token для отправки данных после авторизации

const router = app => {

    // GET-запросы
    app.get('/', (request, response) => {
        
        response.sendFile('src/mainPage/index.html', null, (error) => {
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

    // Регистрация
    app.post('/register', signupValidation, (request, response, next) => {

        console.log(request.body);

        pool.query(`SELECT * FROM users WHERE LOWER(email) = LOWER(${pool.escape(request.body.email)});`, (error, result) => {
            if (result.length) {
                // response.status(409).send("Данный пользователь уже существует<br><button><a href='http://localhost:3210/'>Вернуться на главную страницу</a></button>");
                return response.status(409).send({
                    msg: 'Данный пользователь уже существует!'
                });
            } else {
                // username is available
                bcrypt.hash(request.body.password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        pool.query(`INSERT INTO users (email, pwd, name, surname, patronymic, tel, type) VALUES (
                        ${pool.escape(request.body.email)}, ${pool.escape(hash)}, '${request.body.name}', 
                        '${request.body.surname}', '${request.body.patronymic}', '${request.body.tel}', 'user')`, (err, result)=> {
                            if (err) {
                                throw err;
                                return response.status(400).send({
                                msg: err
                                });
                            }
                            return response.status(201).send({
                                msg: 'Пользователь был зарегистрирован!'
                            });
                        });
                    }
                });
            }
        });
    });

    // Авторизация
    app.post('/login', loginValidation, (request, response, next) => {

        console.log('request.body:');
        console.log(request.body);

        pool.query(`SELECT * FROM users WHERE email = ${pool.escape(request.body.email)};`, (err, result) => {
            // user does not exists
            if (err) {
                throw err;
                return response.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return response.status(401).send({
                    msg: 'Неверный Email или пароль!'
                });
            }

            console.log('user:');
            console.log(result);

            // check password
            // For admin
            if (result[0]['email'] == 'example@mail.ru'){
                if (request.body.password === result[0]['pwd']){
                    const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
                    pool.query(`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`);
                    return response.status(200).send({
                        msg: 'Авторизация пройдена!',
                        token,
                        user: result[0]
                    });
                }else{
                    return response.status(401).send({
                        msg: 'Неверный Email или пароль!'
                    });
                }
            }

            bcrypt.compare(request.body.password, result[0]['pwd'], (bErr, bResult) => {

            // wrong password
                if (bErr) {
                    throw bErr;
                    return response.status(401).send({
                        msg: 'Неверный Email или пароль!'
                    });
                }
            
                if (bResult) {
                    const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
                    pool.query(`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`);
                    return response.status(200).send({
                        msg: 'Авторизация пройдена!',
                        token,
                        user: result[0]
                    });
                }
            });
        });
    });

    // Получение данных пользователя
    app.post('/get-user', signupValidation, (request, response, next) => {
        if(
            !request.headers.authorization ||
            !request.headers.authorization.startsWith('Bearer') ||
            !request.headers.authorization.split(' ')[1]
        ){
            return response.status(422).json({
                message: "Пожалуйста предоставьте токен",
            });
        }
        const theToken = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        pool.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
            return response.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
        });
    });

    // PUT-запросы
    app.put('/', (request, response) => {

    });

    // DELETE-запросы
    app.delete('/user/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM used_car_sales.users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send('User deleted.');
        });
    });
}

module.exports = router;