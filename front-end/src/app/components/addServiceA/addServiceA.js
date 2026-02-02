"use client";
import { useState } from "react";
import { useServiceStore } from "@/app/store/serviceStore";
import { X, Upload, Save, DollarSign, Loader2 } from "lucide-react";
import Image from "next/image";
import useT from "@/app/lib/useT";
import { toast } from "sonner";

const AddServiceModal = ({ isOpen, onClose }) => {
  const t = useT();
  const { addService } = useServiceStore();
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceImage: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      setIsUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const fileData = await res.json();

      if (fileData.secure_url) {
        setFormData({ ...formData, serviceImage: fileData.secure_url });
        toast.success("Image uploaded!");
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

    await addService(dataToSubmit);
    onClose();

    setFormData({
      serviceName: "",
      serviceDescription: "",
      servicePrice: "",
      serviceImage: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-4xl shadow-2xl overflow-hidden font-['Cairo'] animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-4 sm:p-6 flex justify-between items-center text-white">
          <h3 className="text-lg sm:text-2xl font-black font-['Tajawal']">
            {t("crudServices.addService.title")}
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
          {/* Service Name */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              {t("crudServices.addService.nameLabel")}
            </label>
            <input
              required
              type="text"
              placeholder={t("crudServices.addService.namePlaceholder")}
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-gray-700">
              {t("crudServices.addService.descriptionLabel")}
            </label>
            <textarea
              required
              rows={3}
              placeholder={t(
                "crudServices.addService.descriptionPlaceholder"
              )}
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
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
                {t("crudServices.addService.priceLabel")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
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
                {t("crudServices.addService.imageLabel")}
              </label>

              <div
                onClick={() =>
                  !isUploading &&
                  document.getElementById("imageInput").click()
                }
                className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-4 sm:p-6 flex items-center justify-center transition
                ${
                  formData.serviceImage
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 bg-gray-50 hover:border-orange-400"
                }
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isUploading ? (
                  <div className="text-center">
                    <Loader2
                      className="mx-auto text-orange-500 animate-spin mb-2"
                      size={24}
                    />
                    <p className="text-xs font-bold text-gray-500">
                      Uploading...
                    </p>
                  </div>
                ) : formData.serviceImage ? (
                  <div className="relative w-full h-28 sm:h-32">
                    <Image
                      src={formData.serviceImage}
                      alt="Preview"
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload
                      size={24}
                      className="mx-auto text-orange-500 mb-2"
                    />
                    <p className="text-xs sm:text-sm font-bold text-gray-700">
                      {t(
                        "crudServices.addService.imageUploadText"
                      )}
                    </p>
                  </div>
                )}

                <input
                  id="imageInput"
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
            className="w-full py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 cursor-pointer text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 transition flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {t("crudServices.addService.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
