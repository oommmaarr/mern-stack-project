import Order from "../models/order.model.js";

//user dashboard
export const createOrder = async (req, res) => {
  try {
    const { serviceId, userNotes } = req.body;
    const newOrder = new Order({
      userid: req.user._id,
      serviceId,
      userNotes,
    });
    await newOrder.save();
    res.status(200).json({ message: "Order sent to admin!", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

//admin dashboard
export const getAllOrders = async (req, res) => {
  try {
    const orders =await Order.find()
      .populate("userid", "fullname email")
      .populate("serviceId", "serviceName")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

//user dashboard
export const getMyOrder = async (req, res) => {
  try {
    const orders =await Order.find({ userid: req.user._id }).populate(
      "serviceId",
      "serviceName serviceImage",
    );
    if (!orders) {
     return res.status(404).json({ message: "No Orders Yet" });
    }
    res.status(200).json({ myOrders: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching your orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedOrder) {
     return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order status updated", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Updating Status Error" });
  }
};
