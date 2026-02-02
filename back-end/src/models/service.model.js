import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    adminId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceName : { type: String, required: true },
    serviceImage : { type: String, default: "" },
    serviceDescription : { type: String, required: true },
    servicePrice : { type: Number} 
}, {timestamps: true});

const Service = mongoose.model('Service', ServiceSchema);
export default Service;