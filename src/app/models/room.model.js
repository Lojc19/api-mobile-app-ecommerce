const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    room:{
        type:String,
        required:true,
        unique: true,
    },
}, {
    collection: "rooms",
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Room', roomSchema);