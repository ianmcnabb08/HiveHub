const express = require('express');
const router = express.Router();
const Hive = require('../models/hive.model');
const HiveController = require('../controllers/hive.controller');
const InspectionController = require('../controllers/inspection.controller');

module.exports = (app) => {
    app.get('/api/hives', HiveController.getAllHives);
    app.post('/api/hives/new', HiveController.createHive);
    app.get('/api/hives/:id', HiveController.getHive);
    app.put('/api/hives/:id', HiveController.updateHive);
    app.delete('/api/hives/delete/:id', HiveController.deleteHive);
    // Inspection routes tied to a specific hive
    app.get('/api/hives/:id/inspections', InspectionController.getInspectionsByHive);
    app.post('/api/hives/:id/inspections', InspectionController.createInspection);

    // Inspection route for a specific inspection tied to a specific hive
    app.get('/api/inspections/:id', InspectionController.getInspection);

    app.delete('/api/inspections/:id', InspectionController.deleteInspection);
    app.put('/api/inspections/edit/:id', InspectionController.updateInspection);

};