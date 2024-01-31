const mongoose = require('mongoose');
const axios = require('axios');

const InspectionSchema = new mongoose.Schema({
    hive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hive',
        required: true
    },
    queen: { type: String, required: true },
    honey: { type: String, required: true },
    brood: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    notes: { type: String },
    // New field for weather data
    weather: {
        temperature: { type: Number },
        description: { type: String },
    },
}, { timestamps: true });

// Method to fetch weather data for the inspection's hive location
InspectionSchema.methods.fetchWeatherData = async function () {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const location = this.hive.location; // Assuming Hive model has a 'location' field
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather`;

    try {
        const weatherResponse = await axios.get(weatherEndpoint, {
            params: {
                q: location,
                appid: apiKey,
            },
        });

        // Update the weather data in the inspection
        this.weather = {
            temperature: weatherResponse.data.main.temp,
            description: weatherResponse.data.weather[0].description,
        };

        return this.weather;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
};

module.exports = mongoose.model('Inspection', InspectionSchema);


