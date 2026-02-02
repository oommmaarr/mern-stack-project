"use client";
import instance from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import useT from "@/app/lib/useT";
const CrudOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const t= useT();
  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get("order/allOrders");
      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
      toast.error(t("crudOrders.messages.loadError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setIsUpdating(true);
      const res = await instance.put(`order/updateStatus/${orderId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        // تحديث الـ orders في الـ state
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // تحديث الـ selectedOrder إذا كان مفتوح
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }

        // رسائل مختلفة حسب الحالة
        if (newStatus === "completed") {
          toast.success(t("crudOrders.messages.acceptSuccess"), {
            description: t("crudOrders.messages.acceptDesc"),
          });
        } else if (newStatus === "cancelled") {
          toast.error(t("crudOrders.messages.rejectSuccess"), {
            description: t("crudOrders.messages.rejectDesc"),
          });
        } else if (newStatus === "pending") {
          toast.info(t("crudOrders.messages.returnSuccess"), {
            description: t("crudOrders.messages.returnDesc"),
          });
        }

        setIsDetailOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("crudOrders.messages.updateError"), {
        description: t("crudOrders.messages.updateErrorDesc"),
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: Clock,
          label: t("crudOrders.status.pending"),
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: CheckCircle,
          label: t("crudOrders.status.completed"),
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: XCircle,
          label: t("crudOrders.status.cancelled"),
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: Clock,
          label: status,
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
        <div className="w-14 h-14 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#D1D1D1] font-['Cairo'] py-10 px-3 sm:px-4 md:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto mt-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 md:mb-12 bg-white/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-sm mt-20">
            <div>
              <h2 className="font-['Tajawal'] text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {t("crudOrders.title")}
              </h2>
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                {t("crudOrders.subtitle")}
              </p>
            </div>

            <div className="px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold shadow-lg">
              <span className="text-sm">{t("crudOrders.totalOrders")}: </span>
              <span className="text-2xl">{orders.length}</span>
            </div>
          </div>

          {/* Content */}
          {orders.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-lg p-12 sm:p-20 rounded-3xl border border-gray-300 text-center shadow-xl">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Clock size={40} />
              </div>
              <p className="text-gray-500 text-xl sm:text-2xl font-bold italic font-['Tajawal']">
                {t("crudOrders.noOrders")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {orders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={order._id}
                    className="relative bg-white border border-gray-300 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_60px_rgba(255,87,34,0.25)] animate-[slideInUp_0.6s_ease-out_backwards]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 sm:p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-xs opacity-90 mb-1">{t("crudOrders.orderNumber")}</p>
                            <p className="text-lg sm:text-xl font-bold">
                              #{order._id.slice(-8)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleViewClick(order)}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-xl cursor-pointer transition backdrop-blur-sm"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                        <div className="text-sm font-semibold">
                          🎮 {order.serviceId?.serviceName || "غير محدد"}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 md:p-8">
                      {/* Customer Info */}
                      <div className="mb-5">
                        <h3 className="font-['Tajawal'] text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
                          👤 {order.userid?.fullname || "N/A"}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                          {order.userid?.email || "N/A"}
                        </p>
                      </div>

                      {/* Notes */}
                      {order.userNotes && (
                        <div className="mb-5 bg-amber-50 border-r-4 border-amber-400 p-3 rounded-xl">
                          <p className="text-xs text-amber-800 font-semibold mb-1">
                            📝 {t("crudOrders.customerNotes")}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {order.userNotes}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-3 py-1.5 ${statusConfig.bg} ${statusConfig.text} rounded-full text-xs font-bold flex items-center gap-1`}
                          >
                            <StatusIcon size={14} />
                            {statusConfig.label}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {order.isPaid ? (
                            <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              💳 {t("crudOrders.paid")}
                            </div>
                          ) : (
                            <div className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                              ⚠️ {t("crudOrders.unpaid")}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500 font-medium text-center">
                        📅 {formatDate(order.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {isDetailOpen && selectedOrder && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setIsDetailOpen(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white rounded-t-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <h2 className="text-2xl font-bold font-['Tajawal']">
                    {t("crudOrders.orderDetails")}
                  </h2>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition cursor-pointer"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.orderNumber")}
                    </p>
                    <p className="font-bold text-gray-800 break-all">
                      {selectedOrder._id}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.service")}
                    </p>
                    <p className="font-bold text-gray-800">
                      {selectedOrder.serviceId?.serviceName}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.customerName")}
                    </p>
                    <p className="font-bold text-gray-800">
                      {selectedOrder.userid?.fullname}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.email")}
                    </p>
                    <p className="font-bold text-gray-800 text-sm break-all">
                      {selectedOrder.userid?.email}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.paymentStatus")}
                    </p>
                    <p className="font-bold">
                      {selectedOrder.isPaid ? (
                        <span className="text-green-700">✅ {t("crudOrders.paid")}</span>
                      ) : (
                        <span className="text-red-700">❌ {t("crudOrders.unpaid")}</span>
                      )}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 font-semibold">
                      {t("crudOrders.currentStatus")}
                    </p>
                    <p className="font-bold text-gray-800">
                      {getStatusConfig(selectedOrder.status).label}
                    </p>
                  </div>
                </div>

                {selectedOrder.userNotes && (
                  <div className="bg-amber-50 p-4 rounded-2xl border-r-4 border-amber-400">
                    <p className="text-sm text-amber-800 font-semibold mb-2">
                      📝 {t("crudOrders.customerNotes")}
                    </p>
                    <p className="text-gray-700">{selectedOrder.userNotes}</p>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                  <p className="text-sm text-blue-800 font-semibold mb-1">
                    📅 {t("crudOrders.createdDate")}
                  </p>
                  <p className="text-gray-700">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    {t("crudOrders.changeOrderStatus")}:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "completed")
                      }
                      disabled={
                        isUpdating || selectedOrder.status === "completed"
                      }
                      className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        selectedOrder.status === "completed"
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          {t("crudOrders.acceptOrder")}
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "cancelled")
                      }
                      disabled={
                        isUpdating || selectedOrder.status === "cancelled"
                      }
                      className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        selectedOrder.status === "cancelled"
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:shadow-lg"
                      }`}
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <XCircle size={20} />
                          {t("crudOrders.rejectOrder")}
                        </>
                      )}
                    </button>
                  </div>

                  {selectedOrder.status !== "pending" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "pending")
                      }
                      disabled={isUpdating}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-2xl font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Clock size={20} />
                          {t("crudOrders.returnPending")}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap");
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CrudOrders;