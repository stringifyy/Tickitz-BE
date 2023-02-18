const express = require('express');
const router = express();
const formUpload = require('../middleware/formUpload')
// const validation = require('../middleware/validation')

// import controller
const moviesController = require('../controller/movies_controller')

router.get('/', moviesController.read)
router.get('/:id', moviesController.readDetail)
router.post('/', formUpload.single('movies_image'), moviesController.create)
router.patch('/:id', formUpload.single('movies_image'), moviesController.update)
router.delete('/:id', moviesController.remove)

module.exports = router