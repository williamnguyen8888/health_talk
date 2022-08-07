const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String},
        dob: {type: Date},
        image: {type: String},
        role: {type: String},
        refreshToken: {type: String},
    },
    {
        _id: false,
        timestamps: true,
    },
);
// Add Plugin
UserSchema.plugin(AutoIncrement);
module.exports = mongoose.model('User', UserSchema);
