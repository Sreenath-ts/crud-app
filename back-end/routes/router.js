const express = require('express');
const router = express.Router();
const {getData,
    createData,
    updateData,
    deleteData} = require('../controllers/controller')
const {DataValidation} = require('../helpers/validation')

router.get('/data',getData)
router.post('/upload-data',DataValidation,createData)
router.put('/data/:id',DataValidation,updateData);
router.delete('/data/:id',deleteData)

module.exports = router;