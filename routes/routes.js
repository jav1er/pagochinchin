'use strict'

const express = require('express')
const get = require('../controllers/get')
const calculatePrices = require('../controllers/calculatePrices')
const router = express.Router()
const setBs = require('../controllers/setBs')

router.get('/obtener-precios',get.getApiPrices)
router.post('/calculate-prices',calculatePrices)
router.get('/registrar-bs/:precio',setBs)
//router.post('/upload-image/:id', md_upload, ArticleController.upload)

module.exports = router