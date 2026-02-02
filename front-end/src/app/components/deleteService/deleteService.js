"use client";
import { useServiceStore } from "@/app/store/serviceStore";
import { X, Trash2, AlertTriangle } from "lucide-react";
import useT from "@/app/lib/useT";

const DeleteConfirmModal = ({ isOpen, onClose, service }) => {
  const t = useT();
  const { removeService } = useServiceStore();

  const handleDelete = async () => {
    if (!service?._id) return;

    const res = await removeService(service._id);
    if (res?.ok !== false) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-[32px] shadow-2xl overflow-hidden font-['Cairo'] animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={18} />
        </button>

        <div className="p-5 sm:p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertTriangle className="text-red-500" size={32} />
          </div>

          <h3 className="text-lg sm:text-2xl font-black font-['Tajawal'] text-gray-900 mb-2">
            {t("crudServices.deleteService.title")}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {t("crudServices.deleteService.message")}{" "}
            <span className="font-bold text-red-600">
              {service?.serviceName}
            </span>
            . {t("crudServices.deleteService.warning")}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleDelete}
              className="w-full py-3.5 sm:py-4 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              {t("crudServices.deleteService.confirmButton")}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3.5 sm:py-4 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition"
            >
              {t("crudServices.deleteService.cancelButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
