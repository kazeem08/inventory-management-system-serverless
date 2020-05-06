// require('terra-es').init();
const mongoDbClient = require('./lib/mongo_client');
// const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI; // or Atlas connection string
// const mongoose = require('mongoose');


mongoDbClient.init();
// let cachedDb = null;

// function connectToDatabase (uri) {
//   console.log('=> connect to database');

//   if (cachedDb) {
//     console.log('=> using cached database instance');
//     return Promise.resolve(cachedDb);
//   }

//   return MongoClient.connect(uri)
//     .then(db => {
//       cachedDb = db;
//       return cachedDb;
//     });
// }


// const mongoose = require('mongoose');
// const winston = require('winston');


//checking if the envionment is test
// if (process.env.NODE_ENV === 'test') {
// 	db = process.env.db_test;
// 	mongoose
// 		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
// 		.then(() => winston.info(`connected to ${db}`));
// }

// //checking if the envionment is staging
// if (process.env.NODE_ENV === 'staging') {
// 	db = process.env.db;

// 	mongoose
// 		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
// 		.then(() => winston.info(`connected to ${db}`));

// 	//checking if the envionment is production
// } else if (process.env.NODE_ENV === 'production') {
// 	db = process.env.db_production;

// 	mongoose
// 		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
// 		.then(() => winston.info('connected to mongo db...'))
// 		.catch(err => winston.info(err));
// }
// module.exports = {
//     async mongoConnect() {
//         console.log('HERER')
//         let db = 'mongodb://localhost/my_database';

//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//     }

// }