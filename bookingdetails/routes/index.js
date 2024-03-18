const express = require('express')
const HallController = require('../controller/index')
const router = express.Router()

router.get('/rooms/all',HallController.getAllRooms)
router.post('/rooms/create',HallController.createRoom)
router.get('/viewbookingdetails',HallController.getAllBookedRooms)
router.get('/customers',HallController.getAllCustomers)
router.get('/customer/:name',HallController.getBookingCountByCustomer)


module.exports = router