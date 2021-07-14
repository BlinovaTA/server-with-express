const express = require('express');
const router = express.Router();
const db = require('../db/index');

const skillsFields = ['age', 'concerts', 'cities', 'years'];

const isValid = (value => {
  if ((value === '') || (isNaN(value))) {
    return false;
  }

  return true;
});

router.get('/', (req, res, next) => {
  const skills =  db.get('skills').value();
  
  res.render('pages/admin', { title: 'Admin page', skills });
})

router.post('/skills', (req, res, next) => {
  const skills = req.body;

  for (const skill in skills) {
    const value = skills[skill];

    if (skillsFields.includes(skill) && isValid(value)) {
      db.get('skills').find({id: skill}).assign({number: value}).write();
    }
  };

  return res.redirect('/admin');
});

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
