// Import Multer
const { multerUpload } = require('./../lib/multer')

const deleteFiles = require('../helpers/deleteFiles')

const uploadImages = (req, res, next) => {
    const multerResult = multerUpload.fields([{ name: 'images', maxCount: 1 }])
    multerResult(req, res, function (err) {
        try {
            if (err) throw err

            if (req.files.images[0].size > 5000000) throw { message: `${req.files.images[0].originalname} size too large`, fileToDelete: req.files }

            next()
        } catch (error) {
            if (error.fileToDelete) {
                deleteFiles(error.fileToDelete)
            }
            return res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = uploadImages