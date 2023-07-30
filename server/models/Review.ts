export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const reviewSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
},
    {timestamps: true, 
    versionKey: false}
)

export default mongoose.model('Review', reviewSchema)
