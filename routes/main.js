const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json');
const config = require('../config.json');
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    res.render('pages/index', { title: 'Main page', products, skills, msgemail: 'All fields must be filled' });

    return;
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Sent from: <${req.body.email}>`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.render('pages/index', { title: 'Main page', products, skills, msgemail: `An error occurred while sending your email: ${error}` });

      return;
    }

    res.render('pages/index', { title: 'Main page', products, skills, msgemail: 'Email sent successfully' });
  })
})

module.exports = router
