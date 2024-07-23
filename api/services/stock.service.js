const StockModel = require("../schema/stock.schema");
const axios = require('axios');
const { saveStockImage, getImages } = require("./stockImage.service");


const pollData = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?ids=bitcoin,ethereum,tether,binancecoin,solana&vs_currency=usd`);
    const data = response.data;
    for(const priceData of data) {
        const newEntry = StockModel({stock_id: priceData.id,symbol: priceData.symbol,current_price: priceData.current_price, timeStamp: new Date()});
       const stockData = await newEntry.save();
       return stockData;
    }
    
    await saveStockImage(response.data);
  } catch (e) {

  }
};

const getData = async () => {
  try {
    const priceData = await StockModel.aggregate([
      {
        $facet: {
          bitcoin: [
            { $match: { stock_id: 'bitcoin' } },
            { $sort: { timeStamp: -1 } },
            { $limit: 20 }
          ],
          ethereum: [
            { $match: { stock_id: 'ethereum' } },
            { $sort: { timeStamp: -1 } },
            { $limit: 20 }
          ],
          tether: [
            { $match: { stock_id: 'tether' } },
            { $sort: { timeStamp: -1 } },
            { $limit: 20 }
          ],
          binancecoin: [
            { $match: { stock_id: 'binancecoin' } },
            { $sort: { timeStamp: -1 } },
            { $limit: 20 }
          ],
          solana: [
            { $match: { stock_id: 'solana' } },
            { $sort: { timeStamp: -1 } },
            { $limit: 20 }
          ]
        }
      }
    ]);
    const images = await getImages();
    return { priceData , images};

  } catch (error) {
    console.error(`Error fetching data for:`, error);
  }
};



module.exports = { pollData , getData};