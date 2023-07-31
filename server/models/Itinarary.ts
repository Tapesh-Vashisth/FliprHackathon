export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const itinararySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    places: [{
        place: String,
        description: String,
        date: Date
    }]
})

export default mongoose.model('itinarary', itinararySchema)
