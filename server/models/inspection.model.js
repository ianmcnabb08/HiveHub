const mongoose = require('mongoose');
const Inspection = require('./inspection.model')

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
}, { timestamps: true });

module.exports = mongoose.model('Inspection', InspectionSchema);

