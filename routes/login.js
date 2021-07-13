const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  const {email, password} = req.body;
  
  if (!email || !password) {
    res.render('pages/login', {title: 'SigIn page', msglogin: 'Incorrect email or password'})
    return;
  }

  res.redirect('/admin');
})

module.exports = router;