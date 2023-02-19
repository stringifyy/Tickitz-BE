const express = require('express');
const router = express();
// const validation = require('../middlewares/validation')

// import controller
const seatsController = require('../controller/seatsRight_controller.js')

router.get('/', seatsController.read)
router.get('/:id', seatsController.readDetail)
router.post('/', seatsController.create)
// router.put('/', seatsController.update)
router.patch('/:id', seatsController.update)
router.delete('/:id', seatsController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router