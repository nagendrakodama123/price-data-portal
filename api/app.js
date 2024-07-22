const express = require("express")
const cors = require("cors");
require("dotenv").config();

const app = express();

require("./db/db.connection");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// require('./routes/cronJobs')

require("./routes")(app);


// Define a port number
const port = 3505 || 3501;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});