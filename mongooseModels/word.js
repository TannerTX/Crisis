const mongoose = require("mongoose")
const Schema = mongoose.Schema


const wordSchema = new Schema ({
    
    banned_word: {
        type: String,
        required: true
    }

}, {timestamps: true})

const word = mongoose.model("word", wordSchema)
module.exports = word