const mongoose = require('mongoose');

const mongodbUrl = process.env.connectionString.toString();
mongoose.set("strictQuery", false);
mongoose.connect(
        mongodbUrl,
        { useNewUrlParser: true }
    )
    .then(
        () => {
            console.log("Connected to the database");
        },
        (error) => {
             console.error("Connected failed - reject", error);
        }
    )
    .catch((error) => {
        console.error("Connected failed - catch", error);
    });

module.exports = mongoose;
