    import Service from "../models/service.model.js";

    export const createService = async (req,res)=>{
        try{
        const {serviceName , serviceDescription , servicePrice , serviceImage} = req.body;
        const newService = new Service({
            adminId : req.user._id,
            serviceName ,
            serviceDescription,
            servicePrice :servicePrice || null ,
            serviceImage  : serviceImage || ""
        })
        await newService.save();
        res.status(201).json({message : "Service created successfully" , newService});
        }catch(err){
        res.status(500).json({message : "Error creating service"})
        }
    }

    export const updateService =async (req , res)=>{
        try{
            const {id} = req.params;
        const {serviceName , serviceDescription , servicePrice , serviceImage} = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            id,
            {serviceName , serviceDescription , servicePrice , serviceImage},
            {new : true , runValidators : true}
        )

        if(!updatedService){
            return res.status(404).json({message : "Service not found"})
        }
        res.status(200).json({ message : "Service updated successfully" , updatedService})
        }catch(err){
        console.error(err);
        res.status(500).json({message : "Error updating service"})
        }
    }

    export const getAllServices = async(req, res)=>{
        try{
            const services = await Service.find().populate("adminId" , "fullname email")
            res.status(200).json(services);
        }catch(err){
            console.error(err)
            res.status(500).json({message : "Error fetching services"})

        }
    }

    export const getSpecificService = async (req , res)=>{
        try{
        const {id} = req.params;
        const service =await Service.findById(id).populate("adminId" , "fullname email")
        if (!service){
        return res.status(404).json({message : "Service not found"})
        }

        res.status(200).json(service)
        }catch(err){
            res.status(500).json({message : "Error fetching service details"})
        }
    }

    export const deleteService = async(req, res)=>{
        try{
        const {id} = req.params;
        const service =await Service.findByIdAndDelete(id);
        if(!service){
        return res.status(404).json({message : "Service not found"})
        }
        res.status(200).json({message : "Service deleted successfully"})
        }catch(error){
            res.status(500).json({message : "Error deleting service"})
        }
    }