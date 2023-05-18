const express = require('express')
const Router = express.Router()

const { cartController } = require('../controllers')

Router.post('/addCart', cartController.addToCart)
Router.get('/dataCart', cartController.dataCart)
Router.delete('/delete', cartController.deleteCart)

module.exports = Router