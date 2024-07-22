const mogoose = require('mongoose');

const StockImageSchema = new mogoose.Schema({
   stock_id: {
                type: String,
                required: true,
        },
    stock_image: {
            type: String,
            required: true,
    },
    timeStamp: {
            type: Date,
            required: true,
    }
},
);

const StockImageModel = mogoose.model("stockImage", StockImageSchema);
module.exports = StockImageModel;