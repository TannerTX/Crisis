const mongoose = require("mongoose")
const Schema = mongoose.Schema

const stockSchema = new Schema ({
    
    symbol: {
        type: String,
        required: true
    }

}, {timestamps: true})

const stockSymbol = mongoose.model("stocks", stockSchema)
module.exports = stockSymbol