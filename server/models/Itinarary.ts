export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const itinararySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    places: [{
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true
        },
        description: String,
        date: Date
    }]
})

export default mongoose.model('itinarary', itinararySchema)
