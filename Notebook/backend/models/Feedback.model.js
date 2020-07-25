const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
    UserEmail: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    UserDescription: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports=Feedback;


