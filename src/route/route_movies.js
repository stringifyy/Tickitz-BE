const express = require('express');
const router = express();
const formUploadOnline = require('../middleware/formUploadOnline');
// const formUpload = require('../middleware/formUpload')
// const validation = require('../middleware/validation')

// import controller
const moviesController = require('../controller/movies_controller.js');

router.get('/', moviesController.read)
router.get('/:id', moviesController.readDetail)
router.post('/', formUploadOnline.single('movies_image'), moviesController.create)
router.patch('/:id', formUploadOnline.single('movies_image'), moviesController.update)
router.delete('/:id', moviesController.remove)

module.exports = router