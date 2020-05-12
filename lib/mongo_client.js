
const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
    async init() {

        const connectedStatus = await mongoose.connect(config.database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(connectedStatus){
            console.log('Connected to mongodb successfuly');
        }

    }
}