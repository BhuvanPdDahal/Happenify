import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        value: { type: String, required: true },
        name: { type: String, required: true }
    },
    contact: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    ratings: {
        raters: {
            type: [{
                id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                fullName: { type: String, required: true },
                picture: { type: String, default: '' },
                star: { type: Number, required: true, min: 1, max: 5 },
                review: { type: String, required: true, minlength: 20 }
            }],
            default: []
        },
        stars: { type: Number, default: 0 }
    },
    owner: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String, required: true },
        picture: { type: String, default: '' }
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    termsAndConditions: {
        type: [String],
        required: true
    },
    socialMedia: {
        facebook: { type: String, required: true },
        twitter: { type: String, required: true }
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;