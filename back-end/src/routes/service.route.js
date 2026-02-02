import express from "express";
import { protectedRoute, isAdmin } from "../middleware/auth.middleware.js";
import {
  createService,
  deleteService,
  getAllServices,
  getSpecificService,
  updateService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/add", protectedRoute, isAdmin, createService);
router.put("/update/:id", protectedRoute, isAdmin, updateService);
router.get('/' ,protectedRoute ,  getAllServices); 
router.get('/:id' , protectedRoute , getSpecificService); 
router.delete('/delete/:id' , protectedRoute , isAdmin , deleteService)

export default router