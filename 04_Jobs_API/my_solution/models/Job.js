const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required !"],
        maxLength: 50
    },
    position: {
        type: String,
        maxLength: 50,
    },

    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Job creator name is required !"],
    }
}, {timestamps: true})

// JobSchema.pre('save', async function () {

// })

// JobSchema.methods.getName = function () {
//     return this.name;
// }

// JobSchema.methods.createJWT = function () {
// }

// JobSchema.methods.comparePassword = async function (reqPassword) {

// }


module.exports = mongoose.model('Job', JobSchema);