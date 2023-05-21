require("dotenv").config()
const mysql = require("mysql2")

const urlDB = `mysql://root:422zPID5n7fCxbaGEnS4@containers-us-west-100.railway.app:5603/railway`

const connection = mysql.createConnection(urlDB)

module.exports = connection