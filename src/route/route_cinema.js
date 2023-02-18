const express = require('express');
const router = express();
const formUpload = require('../middleware/formUpload')
// const validation = require('../middleware/validation')

// import controller
const cinemaController = require('../controller/cinema_controller')

router.get('/', cinemaController.read)
router.get('/:id', cinemaController.readDetail)
router.post('/', formUpload.single('cinema_image'), cinemaController.create)
// router.patch('/:id', formUpload.single('cinema_image'), cinemaController.update)
router.delete('/:id', cinemaController.remove)

module.exports = router