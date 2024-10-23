

const mongoose = require('mongoose');

mongoose.set("strictQuery",true);
async function  connectMongoDB(url){
    await mongoose.connect(url)
    mongoose.connection.on('error', (err) => {
        console.error('Database connection error:', err);
    });

    mongoose.connection.once('open', () => {
        console.log("Connected to the DB");
    });
}

module.exports = {
    connectMongoDB,
};