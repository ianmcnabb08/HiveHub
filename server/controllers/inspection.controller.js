const Inspection = require('../models/inspection.model');

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
};