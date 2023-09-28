const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minlength: 6,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        minlength: 10,
        maxlength: 10,
        required:true,
        unique: true,
    },
    role:{
        type:String,
        required:true,
        default: "customer",
    },
    cart:{
        type: Array,
        default: [],
    },
    address:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
}, {
    collection: "users",
    timestamps: true,
}
);

userSchema.pre("save",async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
//Export the model
module.exports = mongoose.model('User', userSchema);