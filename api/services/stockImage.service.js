const { findOneAndUpdate } = require("../schema/stock.schema");
const StockImageModel = require("../schema/stockImage.schema");
const axios = require('axios')

const saveStockImage = async (data) => {
    try {
        for (const priceData of data) {
            await StockImageModel.findOneAndUpdate({ stock_id: priceData.id }, { stock_id: priceData.id, stock_image: priceData.image, timeStamp: new Date() }, { upsert: true });

        }
    } catch (error) {
        console.error(`Error fetching data for:`, error);
    }
};

const getImages = async () => {
    try {
        return StockImageModel.find()
    } catch (error) {
        console.error(`Error fetching data for:`, error);
    }
};


module.exports = { saveStockImage , getImages};