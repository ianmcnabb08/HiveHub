const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const Inspection = require('./models/inspection.model');
require('./config/mongoose.config');
require('dotenv').config();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.json());                      
app.use(express.urlencoded({ extended: true }));

app.get('/api/hives/:hiveId/inspections/weather', async (req, res) => {
    try {
        // Extract hiveId and inspectionId from params
        const { hiveId, inspectionId } = req.params;

        // Fetch the hive location
        const inspection = await Inspection.findById(inspectionId).populate('hive');

        if (!inspection) {
            return res.status(404).json({ error: 'Inspection not found' });
        }

        const hive = inspection.hive;

        if (!hive) {
            return res.status(404).json({ error: 'Hive not found for the inspection' });
        }

        const location = hive.location;

        // Fetch weather data
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: location,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric',
            },
        });

        const temperatureCelsius = parseFloat(data.main.temp);
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32);

        // Send weather data to the client
        res.json({
            city: data.name,
            temperature: temperatureFahrenheit,
            description: data.weather[0].description,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

require('./routes/hive.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
