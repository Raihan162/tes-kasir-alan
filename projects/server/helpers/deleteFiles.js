const fs = require('fs')

const deleteFiles = (files) => {
        fs.unlink(files.images[0].path, function (err) {
            try {
                if (err) throw err
            } catch (error) {
            }
        })
}

module.exports = deleteFiles