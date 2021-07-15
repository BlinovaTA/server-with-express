const { join } = require('path')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(join(__dirname, '../db.json'))
const db = lowdb(adapter)

module.exports = db
