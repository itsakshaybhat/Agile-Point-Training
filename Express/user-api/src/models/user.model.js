const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        },

        phone: {
            type: Number,
            required: true,
            unique: true,
            match: [/^[0-9]{10}$/, 'Phone must be 10 digits'],
        },

        address: {
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;