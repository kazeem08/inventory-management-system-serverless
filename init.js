// require('terra-es').init();

require('./lib/mongo_client').init();

// const mongoose = require('mongoose');
// module.exports = {
//     async init() {
//         if(mongoose.connection.readyState !== 0){
//             const connectedStatus = await mongoose.connect('mongodb://localhost/inventory', {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             });

//             if(connectedStatus){
//                 console.log('Connected to mongodb successfuly');
//             }
//         } 
//         console.log('Mongo already connecetd');
        

        

        

//     }
// }