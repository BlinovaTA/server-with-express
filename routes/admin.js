const express = require('express')
const router = express.Router()
const db = require('../db/index')
const formidable = require('formidable')
const fs = require('fs/promises')
const { constants } = require('fs')
const path = require('path')

const skillsFields = ['age', 'concerts', 'cities', 'years']

const isValid = (value) => {
  if (value === '' || isNaN(value)) {
    return false
  }

  return true
}

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Picture not loaded', err: true }
  }

  if (!fields.name) {
    return { status: 'No picture description', err: true }
  }

  if (!fields.price) {
    return { status: 'No price', err: true }
  }

  return { status: 'Ok', err: false }
}

router.get('/', (req, res, next) => {
  const skills = db.get('skills').value()

  res.render('pages/admin', { title: 'Admin page', skills })
})

router.post('/skills', (req, res, next) => {
  const skills = req.body

  for (const skill in skills) {
    const value = skills[skill]

    if (skillsFields.includes(skill) && isValid(value)) {
      db.get('skills').find({ id: skill }).assign({ number: value }).write()
    }
  }

  return res.redirect('/admin')
})

router.post('/upload', async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm()
    const upload = path.normalize(path.join('./public', 'upload'))

    await fs.access('./public', constants.R_OK | constants.W_OK)
    await fs.mkdir(upload, { recursive: true })

    form.uploadDir = path.normalize(path.join(process.cwd(), upload))

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return next(err)
      }

      const valid = validation(fields, files)

      const { path: photoPath, name: photoName } = files.photo
      const { price, name } = fields

      if (valid.err) {
        await fs.unlink(photoPath)

        return next({ message: valid.status })
      }

      const fileName = path.normalize(path.join(upload, photoName))

      await fs.rename(photoPath, fileName)

      db.get('products')
        .push({
          src: path.normalize(path.join('/upload', photoName)),
          name: name,
          price: Number(price),
        })
        .write()

      res.redirect('/')
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
