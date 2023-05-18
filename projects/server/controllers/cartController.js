const sequelize = require('./../models')
const { Op } = require('sequelize')

const db = require('./../models/index')

module.exports = {
    addToCart: async (req, res) => {
        try {
            let { food_id } = req.body

            let checkData = await db.cart.findOne({
                where: {
                    food_id
                }
            })
            console.log(checkData)

            if (!checkData) {
                await db.cart.create({
                    qty: 1, food_id, status: "active"
                })
            } else {
                await db.cart.update({
                    qty: checkData.qty + 1
                }, {
                    where: {
                        food_id
                    }
                })
            }

            res.status(200).send({
                isError: false,
                message: 'Add to cart success',
                data: null
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    dataCart: async (req, res) => {
        try {
            let response = await db.cart.findAll({
                include: [{ model: db.food }]
            })

            res.status(200).send({
                isError: false,
                message: 'Get all data cart success',
                data: response
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    deleteCart: async (req, res) => {
        try {
            await db.cart.destroy({
                where: {
                    status: 'active'
                }
            })

            res.status(200).send({
                isError: false,
                message: "Delete cart success",
                data: null
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    }
}