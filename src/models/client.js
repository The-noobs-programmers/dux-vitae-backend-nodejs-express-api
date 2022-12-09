const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    rut:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Client", clientSchema);