const express = require('express')
const router = express.Router()
const sectionController = require('../controllers/sectionController')

router.route('/')
    .get(sectionController.getAllSections)
    .post(sectionController.createSection)
    .patch(sectionController.updateSection)
    .delete(sectionController.deleteSection)

module.exports = router