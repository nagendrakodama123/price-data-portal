const cron = require('node-cron');
const stockService = require('../services/stock.service')


// Schedule the cron job to run every 30 seconds
cron.schedule('*/30 * * * * *', async () => {
    try {
        const serviceResponse = await stockService.pollData();
        console.log('Cron job executed:', serviceResponse);
    } catch (error) {
        console.error('Error executing cron job:', error.message);
    }
});