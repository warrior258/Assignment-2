const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    image: {
        type: String
    },
    buttonText: {
        type: String,
        default: "Next"
    }

});

module.exports = mongoose.model('Form', FormSchema);