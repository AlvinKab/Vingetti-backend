const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

router.route('/')
    .get(customerController.getAllCustomers)
    .get(customerController.getOneCustomer)
    .post(customerController.createCustomer)
    .patch(customerController.updateCustomer)
    .delete(customerController.deleteOneCustomer)
    .delete(customerController.deleteAllCustomers)

module.exports = router