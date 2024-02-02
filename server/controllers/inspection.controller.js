const Inspection = require('../models/inspection.model');
const axios = require('axios');

module.exports = {
    getInspectionsByHive: async (request, response) => {
        try {
            const hiveId = request.params.id;
            const inspections = await Inspection.find({ hive: hiveId });
            response.status(200).json(inspections);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createInspection: async (request, response) => {
        try {
            const hiveId = request.params.id;
            const newInspection = { ...request.body, hive: hiveId };
            const inspection = await Inspection.create(newInspection);

            // Fetch weather data and update the inspection
            await inspection.fetchWeatherData();

            response.status(201).json(inspection);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getInspection: async (request, response) => {
        try {
            const inspection = await Inspection.findOne({ _id: request.params.id });
            if (!inspection) {
                response.status(404).json({ error: 'Inspection not found' });
                return;
            }
            response.status(200).json(inspection);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateInspection: async (request, response) => {
        try {
            const updatedInspection = await Inspection.findOneAndUpdate(
                { _id: request.params.id },
                request.body,
                { new: true }
            );
            if (!updatedInspection) {
                response.status(404).json({ error: 'Inspection not found' });
                return;
            }
            response.status(200).json(updatedInspection);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteInspection: async (request, response) => {
        try {
            const deleteConfirmation = await Inspection.deleteOne({ _id: request.params.id });
            if (deleteConfirmation.deletedCount === 0) {
                response.status(404).json({ error: 'Inspection not found' });
                return;
            }
            response.status(200).json(deleteConfirmation);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    fetchWeatherData: async (request, response) => {
        try {
            const inspectionId = request.params.id;
            const inspection = await Inspection.findOne({ _id: inspectionId });

            if (!inspection) {
                response.status(404).json({ error: 'Inspection not found' });
                return;
            }

            const apiKey = process.env.OPENWEATHER_API_KEY;
            const location = inspection.hive.location;
            const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather`;

            const weatherResponse = await axios.get(weatherEndpoint, {
                params: {
                    q: location,
                    appid: apiKey,
                },
            });

            inspection.weather = {
                temperature: weatherResponse.data.main.temp,
                description: weatherResponse.data.weather[0].description,
            };

            await inspection.save();

            response.status(200).json(inspection.weather);
        } catch (error) {
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
