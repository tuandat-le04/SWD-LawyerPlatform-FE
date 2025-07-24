import React from "react";
import { exportLandTransferContractToWord } from "../utils/exportLandTransferContractToWord";
import { exportCivilLawsuitToWord } from "../utils/exportCivilLawsuitToWord";
import { exportAuthorizationFormToWord } from "../utils/exportAuthorizationFormToWord";
import { exportHouseRentalContractToWord } from "../utils/exportHouseRentalContractToWord";
import { exportLaborContractToWord } from "../utils/exportLaborContractToWord";
import { exportDivorceFormToWord } from "../utils/exportDivorceFormToWord";
import { exportAdministrativeComplaintFormToWord } from "../utils/exportAdministrativeComplaintFormToWord";
import { exportWillFormToWord } from "../utils/exportWillFormToWord";
import { exportServiceContractFormToWord } from "../utils/exportServiceContractFormToWord";


import CivilLawsuitForm from "../legalforms/CivilLawsuitForm";
import LandTransferContractForm from "../legalforms/LandTransferContractForm";
import AuthorizationForm from "../legalforms/AuthorizationForm";
import HouseRentalContractForm from "../legalforms/HouseRentalContractForm";
import LaborContractForm from "../legalforms/LaborContractForm";
import DivorceForm from "../legalforms/DivorceForm";
import AdministrativeComplaintForm from "../legalforms/AdministrativeComplaintForm";
import WillForm from "../legalforms/WillForm";
import ServiceContractForm from "../legalforms/ServiceContractForm";

export default function LegalFormModal({ isOpen, onClose, formContent, formData }) {
    if (!isOpen) return null;

    const handleDownloadWord = () => {
        if (formData && formData.title === "Đơn khởi kiện dân sự") {
            exportCivilLawsuitToWord();
        } else if (formData && formData.title === "Hợp đồng mua bán nhà đất") {
            exportLandTransferContractToWord();
        } else if (formData && formData.title === "Giấy ủy quyền") {
            exportAuthorizationFormToWord();
        } else if (formData && formData.title === "Hợp đồng cho thuê nhà") {
            exportHouseRentalContractToWord();
        } else if (formData && formData.title === "Hợp đồng lao động") {
            exportLaborContractToWord();
        } else if (formData && formData.title === "Đơn ly hôn") {
            exportDivorceFormToWord();
        } else if (formData && formData.title === "Đơn khiếu nại hành chính") {
            exportAdministrativeComplaintFormToWord();
        } else if (formData && formData.title === "Di chúc") {
            exportWillFormToWord();
        } else if (formData && formData.title === "Hợp đồng dịch vụ") {
            exportServiceContractFormToWord();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="overflow-y-auto max-h-[70vh] mb-4">
                    {formData && formData.title === "Hợp đồng mua bán nhà đất" ? (
                        <LandTransferContractForm />
                    ) : formData && formData.title === "Đơn khởi kiện dân sự" ? (
                        <CivilLawsuitForm />
                    ) : formData && formData.title === "Giấy ủy quyền" ? (
                        <AuthorizationForm />
                    ) : formData && formData.title === "Hợp đồng cho thuê nhà" ? (
                        <HouseRentalContractForm />
                    ) : formData && formData.title === "Hợp đồng lao động" ? (
                        <LaborContractForm />
                    ) : formData && formData.title === "Đơn ly hôn" ? (
                        <DivorceForm />
                    ) : formData && formData.title === "Đơn khiếu nại hành chính" ? (
                        <AdministrativeComplaintForm />
                    ) : formData && formData.title === "Di chúc" ? (
                        <WillForm />
                    ) : formData && formData.title === "Hợp đồng dịch vụ" ? (
                        <ServiceContractForm />
                    ) : (
                        formContent
                    )}

                </div>
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
                    onClick={handleDownloadWord}
                >
                    Tải file Word
                </button>
            </div>
        </div>
    );
}
