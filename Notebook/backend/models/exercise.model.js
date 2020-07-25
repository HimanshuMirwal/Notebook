const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    path:  { type: String },
    FileName: { type: String },
    pathPdf:{type:String},
    FileNamePDF:{type:String}
},
    {
        timestamps: true
    }
);
const Exercise = mongoose.model("exercise", ExerciseSchema);
module.exports = Exercise;

