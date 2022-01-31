
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema( {
        name: { 
            type: String, 
            required: [true, "Cannot be empty"], 
            trim: true, 
            maxlength: [ 50, "Max length 50 chars"] 
        },
        completed: { 
            type: Boolean,    
            default: false 
        },
    }, 
    { timestamps: true, updatedAt: false}
);

module.exports = mongoose.model("Task", TaskSchema);