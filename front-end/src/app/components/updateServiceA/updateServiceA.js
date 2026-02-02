"use client";
import { useState, useEffect } from "react";
import { useServiceStore } from "@/app/store/serviceStore";
import { X, Upload, Save, DollarSign, Loader2 } from "lucide-react";
import Image from "next/image";
import useT from "@/app/lib/useT";

const UpdateServiceModal = ({ isOpen, onClose, service }) => {
  const t = useT();
  const { updateService } = useServiceStore();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceImage: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName || "",
        serviceDescription: service.serviceDescription || "",
        servicePrice: service.servicePrice || "",
        serviceImage: service.serviceImage || "",
      });
    }
  }, [service]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    try {
      setIsUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );
      const fileData = await res.json();

      if (fileData.secure_url) {
        setFormData((prev) => ({ ...prev, serviceImage: fileData.secure_url }));
        toast.success("Image updated!");
      }
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    const dataToSubmit = {
      ...formData,
      servicePrice: formData.servicePrice
        ? Number(formData.servicePrice)
        : null,
    };

    const res = await updateService(service._id, dataToSubmit);
    if (res?.ok) {
      toast.success("Service updated successfully");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-[32px] shadow-2xl overflow-hidden font-['Cairo'] animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 sm:p-6 flex justify-between items-center text-white">
          <h3 className="text-lg sm:text-2xl font-black font-['Tajawal']">
            {t("crudServices.updateService.title")}
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
        >
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              {t("crudServices.updateService.nameLabel")}
            </label>
            <input
              required
              type="text"
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              {t("crudServices.updateService.descriptionLabel")}
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.serviceDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceDescription: e.target.value,
                })
              }
            />
          </div>

          {/* Price + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                {t("crudServices.updateService.priceLabel")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.servicePrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      servicePrice: e.target.value,
                    })
                  }
                />
                <DollarSign
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                {t("crudServices.updateService.imageLabel")}
              </label>
              <div
                onClick={() =>
                  !isUploading &&
                  document.getElementById("updateImageInput").click()
                }
                className={`relative cursor-pointer border-2 border-dashed rounded-xl p-4 flex items-center justify-center transition
                ${formData.serviceImage ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-blue-400"}
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isUploading ? (
                  <Loader2 className="animate-spin text-blue-600" size={24} />
                ) : formData.serviceImage ? (
                  <div className="flex items-center gap-3">
                    <Image
                      src={formData.serviceImage}
                      alt="preview"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <span className="text-xs font-bold text-blue-600">
                      {t("crudServices.updateService.imageSelectedText")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Upload size={18} />
                    <span className="text-xs font-bold">
                      {t("crudServices.updateService.updateImageText")}
                    </span>
                  </div>
                )}
                <input
                  id="updateImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3.5 sm:py-4 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg transition flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {t("crudServices.updateService.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
