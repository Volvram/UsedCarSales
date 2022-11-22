// Подгружаем модули
const pool = require("../data/config.js");  // Пул
const { signupValidation, loginValidation } = require('../validation.js');  // Валидаторы регистрации и входа
const { validationResult } = require('express-validator');  // Результат проверки валидности
const bcrypt = require('bcryptjs');  // Хэширование паролей
const jwt = require('jsonwebtoken');  // Json-web token для отправки данных после авторизации

const path = require("path");  //npm install path
const fs = require("fs");

// Form data handler
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({storage: storage});

// const upload = multer();

const router = app => {

    // GET-запросы
    app.get('/', (request, response) => {
        
        response.sendFile('src/mainPage/index.html', null, (error) => {
            if (error) throw error;
        });
    });

    app.get('/getCarCatalog', (request, response) => {

        pool.query(`SELECT cars.id, cars.owner_id, cars.mark, cars.model, cars.price, cars.status, images.directory, images.name, images.extension, images.role
        FROM cars JOIN images
        ON cars.id = images.car_id
        WHERE cars.status = 1`, (error, result) => {
            if (error){
                response.send({
                    message: `Ошибка получения данных, попробуйте позже, ${error.message}`
                });
                return;
            } else{
                result = result.map((car, index) => {
                    let res = {};
                    let photo = '';
                    photo = car.directory + car.name + car.extension;
                    for (let key in car){
                        if (key != 'directory' && key != 'name' && key != 'extension'){
                            res[key] = car[key];
                        }
                    }
                    res.photo = photo;
                    return res;
                });
                
                response.send({
                    message: 'cars received',
                    data: result
                });
            }
        });
    });

    app.get('/getCar', (request, response) => {
        const id = request.query.id;

        pool.query(`SELECT cars.id, cars.owner_id, cars.mark, cars.model, cars.price, cars.status, cars.type, cars.manufacture_year, 
cars.mileage, cars.body, cars.color, cars.engine_id, cars.tax, cars.transmission, cars.drive_unit, cars.steering_wheel, 
cars.owners_number, users.id, users.email, users.name, users.surname, users.patronymic, users.tel, 
engines.id, engines.volume, engines.power, engines.fuel_type, 
images.directory, images.name, images.extension, images.role

FROM cars JOIN users
ON cars.owner_id = users.id
JOIN engines
ON cars.engine_id = engines.id
JOIN images
ON cars.id = images.car_id
WHERE cars.status = 1 AND cars.id = ${id}`, (error, result) => {
            if (error){
                response.send({
                    message: `Ошибка получения данных, попробуйте позже, ${error.message}`
                });
                return;
            } else{
                result = result.map((car, index) => {
                    let res = {};
                    let photo = '';
                    photo = car.directory + car.name + car.extension;
                    for (let key in car){
                        if (key != 'directory' && key != 'name' && key != 'extension'){
                            res[key] = car[key];
                        }
                    }
                    res.photo = photo;
                    return res;
                });
                
                response.send({
                    message: 'cars received',
                    data: result
                });
            }
        });
    });

    app.get('/getMyCars/:id', (request, response) => {
        const id = request.params.id;

        pool.query(`SELECT cars.id, cars.owner_id, cars.mark, cars.model, cars.price, cars.status, images.directory, images.name, images.extension, images.role
        FROM cars JOIN images
        ON cars.id = images.car_id
        WHERE cars.owner_id = ${id}`,(error, result) => {
            if (error){
                response.send({
                    message: `Ошибка получения данных, попробуйте позже, ${error.message}`
                });
                return;
            } else{
                result = result.map((car, index) => {
                    let res = {};
                    let photo = '';
                    photo = car.directory + car.name + car.extension;
                    for (let key in car){
                        if (key != 'directory' && key != 'name' && key != 'extension'){
                            res[key] = car[key];
                        }
                    }
                    res.photo = photo;
                    return res;
                });
                
                response.send({
                    message: 'cars received',
                    data: result
                });
            }
        });
    });

    // POST-запросы
    // Регистрация
    app.post('/register', signupValidation, (request, response, next) => {
        for (let key in request.body){
            if (request.body[key] == null && key != 'patronymic'){
                response.send({
                    message: `Ошибка создания пользователя, поле ${key} должно быть заполнено`
                });
                return;
            }
        }
        pool.query(`SELECT * FROM used_car_sales.users WHERE LOWER(email) = LOWER(${pool.escape(request.body.email)});`, (error, result) => {
            if (result.length) {
                // response.status(409).send("Данный пользователь уже существует<br><button><a href='http://localhost:3210/'>Вернуться на главную страницу</a></button>");
                return response.status(409).send({
                    message: 'Данный пользователь уже существует!'
                });
            } else {
                // username is available
                bcrypt.hash(request.body.password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).send({
                            message: err
                        });
                    } else {
                        // has hashed pw => add to database
                        pool.query(`INSERT INTO used_car_sales.users (email, pwd, name, surname, patronymic, tel, type) VALUES (
                        ${pool.escape(request.body.email)}, ${pool.escape(hash)}, '${request.body.name}', 
                        '${request.body.surname}', '${request.body.patronymic}', '${request.body.tel}', 'user')`, (err, result)=> {
                            if (err) {
                                return response.status(400).send({
                                    message: err
                                });
                            }
                            return response.status(201).send({
                                message: 'Пользователь был зарегистрирован!'
                            });
                        });
                    }
                });
            }
        });
    });

    // Авторизация
    app.post('/login', loginValidation, (request, response, next) => {

        pool.query(`SELECT * FROM used_car_sales.users WHERE email = ${pool.escape(request.body.email)};`, (err, result) => {
            // user does not exists
            if (err) {
                return response.status(400).send({
                    message: err
                });
            }
            if (!result.length) {
                return response.status(401).send({
                    message: 'Неверный Email или пароль!'
                });
            }

            // check password
            // For admin
            if (result[0]['email'] == 'admin@mail.ru'){
                if (request.body.password === result[0]['pwd']){
                    const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '15m' });
                    pool.query(`UPDATE used_car_sales.users SET last_login = now() WHERE id = '${result[0].id}'`);
                    return response.status(200).send({
                        message: 'Авторизация пройдена!',
                        token,
                        user: result[0]
                    });
                }else{
                    return response.status(401).send({
                        message: 'Неверный Email или пароль!'
                    });
                }
            }

            bcrypt.compare(request.body.password, result[0]['pwd'], (bErr, bResult) => {

            // wrong password
                if (bErr) {
                    return response.status(401).send({
                        message: 'Неверный Email или пароль!'
                    });
                }
            
                if (bResult) {
                    const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '30m' });
                    pool.query(`UPDATE used_car_sales.users SET last_login = now() WHERE id = '${result[0].id}'`);
                    return response.status(200).send({
                        message: 'Авторизация пройдена!',
                        token,
                        user: result[0]
                    });
                }
            });
        });
    });

    // Получение данных пользователя
    app.post('/get-user', (request, response, next) => {
        if(
            !request.headers.authorization ||
            !request.headers.authorization.startsWith('Bearer') ||
            !request.headers.authorization.split(' ')[1]
        ){
            return response.status(422).json({
                error: true,
                message: "Пожалуйста предоставьте токен",
            });
        }
        const theToken = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect', (err, res) => {
            if (err){
                response.send({error: true, message: "Токен истёк"});
                return;
            }else{
                return res;
            }
        });
        if (decoded != undefined){
            pool.query('SELECT * FROM used_car_sales.users where id=?', decoded.id, function (error, results, fields) {
                if (error){
                    return response.send({error: true, message: "Что-то пошло не так"});
                } 
                return response.send({ error: false, user: results[0], message: 'Аутентификация пройдена.' });
            });
        }
    });

    // Создание нового объявления об автомобиле
    // ДОДЕЛАТЬ
    app.post("/addCar", upload.single('file'), (request, response) => {
        console.log(request.body);
        console.log(request.file);

        // Parts of the photo
        const arr = request.file.originalname.split('.');
        const extension = "."+arr[arr.length-1];
        const name = arr[arr.length-2];

        // Re-load photo from the temp dir to real dir
        const photo = fs.readFileSync(path.join(__dirname, `..\\src\\uploads\\${request.file.originalname}`));
        fs.writeFileSync(path.join(__dirname, `..\\src\\carPhotos\\${name}_${request.body.owner_id}${extension}`), photo);
        fs.unlinkSync(path.join(__dirname, `..\\src\\uploads\\${request.file.originalname}`));

        response.send({
            error: false,
            message: "Автомобиль успешно добавлен",
        })
    })

    // PUT-запросы
    app.put('/user/edit', (request, response) => {
        const id = request.body.id;
        
        pool.query('UPDATE used_car_sales.users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error){
                response.send({
                    message: 'Ошибка обновления данных',
                    error: error.message
                });
            }else{
                response.send({
                    message: 'Данные успешно обновлены'
                });
            }
        });
    });

    // DELETE-запросы
    app.delete('/user/delete', (request, response) => {
        const id = request.body.id;

        pool.query('DELETE FROM used_car_sales.users WHERE id = ?', id, (error, result) => {
            if (error){
                response.send({
                    message: 'Ошибка удаления аккаунта',
                    error: error.message
                });
            }else{
                response.send({
                    message: 'Аккаунт успешно удалён',
                });
            }
        });
    });
}

module.exports = router;