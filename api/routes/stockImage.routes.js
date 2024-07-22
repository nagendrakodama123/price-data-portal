const express = require('express');
const router = express.Router();
const stockImageService = require('../services/stockImage.service')


router.get('/data', async (req, res) => {    
    try {
            const serviceResponse = await stockImageService.saveStockImage();
            res.status(200).send({ success: true, data: serviceResponse });
        
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
  });
  module.exports = router;