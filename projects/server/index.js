const express = require('express');
const cors = require('cors');
const { join } = require("path");
const path = require("path");

const app = express()
app.use(express.json())

const PORT = 5603

app.use(cors());

app.get('/', (req, res) => {
    res.status(201).send("<h1>Tes Kasir Alan</h1>")
})
app.use('/Public', express.static(path.join(__dirname, '/Public')))

// Import Router
const { foodRouter, cartRouter } = require('./routers')

app.use('/food', foodRouter)
app.use('/cart', cartRouter)

app.listen(PORT, () => console.log(`API Running on Port ${PORT}`))

// Sequelize Synchronous
// const Sequelize = require('sequelize')
// const Models = require('./models')
// Models.sequelize.sync({
//     force: false,
//     alter: true,
//     logging: console.log
// }).then(function () {
//     console.log('Database is Synchronized')
// }).catch(function (err) {
//     console.log(err, 'Something Went Wrong with Database Update!')
// });