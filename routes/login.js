const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  const {email, password} = req.body;
  
  if (!email || !password) {
    res.render('pages/login', {title: 'SigIn page', msglogin: 'Incorrect email or password'})
    return;
  }

  const userIsExist = db.get('users').find({ email, password }).value();

  if (userIsExist) {
    res.redirect('/admin');
  } else {
    res.render('pages/login', {title: 'SigIn page', msglogin: 'User not founded'})
  }
});

module.exports = router;