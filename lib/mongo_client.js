
const debug = require('debug')('mongodb');
const mongoose = require('mongoose');

module.exports = {
    async init() {
        console.log('HERER')

        const connectedStatus = await mongoose.connect('mongodb://localhost/my_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(connectedStatus){
            console.log('Connected to mongodb successfuly');
        }

    }
}