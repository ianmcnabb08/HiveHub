const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(
    cors({
        origin: "http://localhost:3000",
}),
);
app.use(express.json());                      
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');

require('./routes/hive.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})



