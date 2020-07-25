const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
},
    {
        timestamps: true
    }
);
const user = mongoose.model("username", UserSchema);
module.exports=user;


