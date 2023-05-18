const express = require('express')
const Router = express.Router()

const { foodController } = require('../controllers')
const upload = require('../middleware/upload')

Router.get('/allFood', foodController.allFood)
Router.post('/addFood', upload, foodController.addFood)

module.exports = Router