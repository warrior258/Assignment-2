const Form = require('../models/Form')


const getFormData = async (req, res) => {
    
    try {
        const get = await Form.find({});
        res.status(201).json(get[0]);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateFormData = async (req, res) => {

    // const { image } = req.body;
    
    const id = "64564de21d3d6b8ccc73c72c";

    try {
        const upload = await Form.findByIdAndUpdate({_id: id}, req.body, {new: true})
        res.status(201).json(upload);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getFormData, updateFormData };