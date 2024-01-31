const mongoose = require('mongoose');
const Inspection = require('./inspection.model')

const HiveSchema = new mongoose.Schema({
    name: { type: String },
    equipment: { type: String },
    installDate: {type: Date},
    notes: {type: String},
    location: {type: String},
    inspections: [{ type: mongoose.Schema.Types.ObjectId, ref:'Inspection'}],
}, { timestamps: true });

module.exports = mongoose.model('Hive', HiveSchema);

