const express = require('express');
const router = express();
// const validation = require('../middlewares/validation')

// import controller
const historyController = require('../controller/history_controller')

router.get('/', historyController.read)
router.get('/:id', historyController.readDetail)
router.post('/', historyController.create)
// router.put('/', historyController.update)
// router.patch('/:id', historyController.update)
router.delete('/:id', historyController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router