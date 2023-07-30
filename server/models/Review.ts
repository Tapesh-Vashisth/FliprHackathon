export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    email: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true,
        default: ""
    },
    rating: {
        type: Number,
        required: true
    },
},
    {timestamps: true}
)

export default mongoose.model('Review', reviewSchema)
