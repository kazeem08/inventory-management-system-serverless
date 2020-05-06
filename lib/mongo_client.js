
const mongoose = require('mongoose');

module.exports = {
    async init() {

        const connectedStatus = await mongoose.connect(process.env.database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(connectedStatus){
            console.log('Connected to mongodb successfuly');
        }

    }
}