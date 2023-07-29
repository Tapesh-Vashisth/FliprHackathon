export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verified: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    favouritePlaces: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Place",
        required: false
    },
    itinarary: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itinarary"
    }]
})

export default mongoose.model('User', userSchema)
