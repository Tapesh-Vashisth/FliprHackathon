export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const itinerarySchema = new Schema({
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
        date: Date
    }]
})

export default mongoose.model('Itinerary', itinerarySchema)
