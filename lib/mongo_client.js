
const mongoose = require('mongoose');

module.exports = {
    async init() {

        const connectedStatus = await mongoose.connect('mongodb://localhost/inventory', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(connectedStatus){
            console.log('Connected to mongodb successfuly');
        }

    }
}