const mongoose = require('mongoose');
const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    Image:{
        type:String,
        required:true
    }

},{timestamps:true,versionKey:false});

module.exports = mongoose.model("User",userSchema);

//timestamp key