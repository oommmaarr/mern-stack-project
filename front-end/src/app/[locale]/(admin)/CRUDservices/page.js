"use client";
import { useEffect, useState } from "react";
import { useServiceStore } from "@/app/store/serviceStore";
import { Trash2, Edit, Plus, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import AddServiceModal from "@/app/components/addServiceA/addServiceA";
import UpdateServiceModal from "@/app/components/updateServiceA/updateServiceA";
import DeleteConfirmModal from "@/app/components/deleteService/deleteService";
import useT from "@/app/lib/useT";

const CRUDservices = () => {
  const t = useT();
  const { services, isLoading, fetchServices } = useServiceStore();

  const [selectedService, setSelectedService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1D1D1]">
        <div className="w-14 h-14 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D1D1D1] font-['Cairo'] py-10 px-3 sm:px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto mt-16">
        {/* Modals */}
        <AddServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <UpdateServiceModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          service={selectedService}
          key={selectedService?._id || "empty"}
        />
        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          service={selectedService}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 md:mb-12 bg-white/50 p-5 sm:p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-sm mt-20">
          <div>
            <h2 className="font-['Tajawal'] text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 ">
              {t("crudServices.title")}
            </h2>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              {t("crudServices.subtitle")}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full md:w-auto flex items-center cursor-pointer justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
          >
            <Plus size={20} />
            {t("crudServices.addNewButton")}
          </button>
        </div>

        {/* Content */}
        {services.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg p-12 sm:p-20 rounded-3xl border border-gray-300 text-center shadow-xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ImageIcon size={40} />
            </div>
            <p className="text-gray-500 text-xl sm:text-2xl font-bold italic font-['Tajawal']">
              {t("crudServices.noServices")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="relative bg-white border border-gray-300 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_60px_rgba(255,87,34,0.25)] animate-[slideInUp_0.6s_ease-out_backwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  {service.serviceImage ? (
                    <Image
                      src={service.serviceImage}
                      alt={service.serviceName}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <ImageIcon className="text-gray-400" size={48} />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-2 scale-90 sm:scale-100">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="bg-white/90 p-2.5 rounded-xl cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white transition shadow-lg"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(service)}
                      className="bg-white/90 p-2.5 rounded-xl cursor-pointer text-red-600 hover:bg-red-600 hover:text-white transition shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8">
                  <h3 className="font-['Tajawal'] text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3">
                    {service.serviceName}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium line-clamp-3 sm:line-clamp-2">
                    {service.serviceDescription}
                  </p>

                  {service.servicePrice && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-gray-200">
                      <div>
                        <span className="text-xs text-gray-500 font-semibold italic">
                          {t("crudServices.currentPrice")}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-['Tajawal'] text-xl sm:text-2xl font-black text-orange-500">
                            {service.servicePrice}
                          </span>
                          <span className="text-xs font-bold text-gray-700">
                            {t("crudServices.currency")}
                          </span>
                        </div>
                      </div>

                      <div className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs text-center font-bold w-fit">
                        {t("crudServices.active")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
      `}</style>
    </div>
  );
};

export default CRUDservices;
