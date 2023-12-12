const Hive = require('../models/hive.model');
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports = {
    
    getAllHives: (request, response) => {
        Hive.find()
            .then((hives) => response.json(hives))
            .catch((err) => response.json(err));
        },

    createHive: (request, response) => {
        Hive.create(request.body) 
            .then(hive => response.json(hive))
            .catch(err => response.json(err));
    },

    getHive: (request, response) => {
        Hive.findOne({_id:request.params.id})
            .then(hive => response.json(hive))
            .catch(err => response.json(err));
    },

    updateHive: (request, response) => {
        Hive.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
            .then(updatedHive => response.json(updatedHive))
            .catch(err => response.json(err))
    },

    deleteHive: (request, response) => {
        Hive.deleteOne({_id: request.params.id})
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
    }
};