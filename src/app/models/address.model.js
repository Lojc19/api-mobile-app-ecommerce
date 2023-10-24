const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema({
}, {
    collection: "categories",
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Address', addressSchema);