import { createOrder, getAllOrders, getMyOrder, updateOrderStatus } from "../controllers/order.controller.js"
import express from "express"
import { protectedRoute , isAdmin } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post('/createOrder' , protectedRoute , createOrder); //user
router.get("/getMyOrder" , protectedRoute , getMyOrder); //user
router.get("/allOrders" , protectedRoute , isAdmin , getAllOrders); //admin
router.put("/updateStatus/:id" , protectedRoute , isAdmin , updateOrderStatus) //admin


export default router