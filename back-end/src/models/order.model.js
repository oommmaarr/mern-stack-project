import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userNotes: {
      type: String,
      default: "",
      required : true
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "completed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;