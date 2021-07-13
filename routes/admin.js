const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('/', (req, res, next) => {
  const skills =  db.get('skills').value();
  
  res.render('pages/admin', { title: 'Admin page', skills });
})

router.post('/skills', (req, res, next) => {
  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
  res.send('Реализовать сохранение нового объекта со значениями блока скиллов')
})

router.post('/upload', (req, res, next) => {
  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
  res.send('Реализовать сохранения объекта товара на стороне сервера')
})

module.exports = router
