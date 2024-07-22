const mogoose = require('mongoose');

const StockSchema = new mogoose.Schema({
   stock_id: {
                type: String,
                required: true,
        },
    symbol: {
            type: String,
            required: true,
    },

    current_price: {
            type: String,
            required: true,
    },
    timeStamp: {
            type: Date,
            required: true,
    }
},
);

const StockModel = mogoose.model("stocks", StockSchema);
module.exports = StockModel;