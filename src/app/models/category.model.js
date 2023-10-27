const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    nameCate:{
        type: String,
        required: true,
        unique: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Room',
    },
    icUrl: {
        type: String,
        required: true,
    }
}, {
    collection: "categories",
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Category', categorySchema);