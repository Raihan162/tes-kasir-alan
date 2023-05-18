const sequelize = require('./../models')
const { Op } = require('sequelize')

const db = require('./../models/index')
const deleteFiles = require('./../helpers/deleteFiles')

module.exports = {
    allFood: async (req, res) => {
        try {
            let data = await db.food.findAll()

            res.status(200).send({
                isError: false,
                message: "Get all food data success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    addFood: async (req, res) => {
        // const t = await sequelize.transaction();
        try {
            let dataToCreate = JSON.parse(req.body.data)

            if (dataToCreate.name.length === 0) return res.status(400).send({
                isError: true,
                message: "Please input name",
                data: null
            })

            // if (isNan(dataToCreate.price)) return res.status(400).send({
            //     isError: true,
            //     message: "Please input a number",
            //     data: null
            // })

            let response = await db.food.create({ ...dataToCreate, name: dataToCreate.name, price: dataToCreate.price, picture: req.files.images[0].filename })

            // await t.commit()
            res.status(200).send({
                isError: false,
                message: "Add Product Success",
                data: response
            })
        } catch (error) {
            // await t.rollback()
            // deleteFiles(req.files)
            // console.log(error)
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    }
}