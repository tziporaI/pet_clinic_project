import { useState, useEffect, useRef } from "react";
import { IPatient, PetType } from "@/lib/interfaces";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { usePatientValidation } from "hooks/usePatientValidation";

const PET_TYPES: PetType[] = ["Dog", "Cat", "Parrot"];

interface Props {
  patient: IPatient & { _id: string };
  onClose: () => void;
  onSaved: (updated: any) => void;
  onDeleted: (id: string) => void;
}

const EditPatientModal = ({ patient, onClose, onSaved, onDeleted }: Props) => {
  const [form, setForm] = useState(patient);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { errors, validate } = usePatientValidation();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
    } else if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);


  const handleChange = (k: keyof IPatient, v: any) => {
    setForm({ ...form, [k]: v });
    validate(k, v);
  };

  const save = async () => {
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch(`/api/patients?id=${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        onSaved(form);
        onClose();
      }
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50
                    p-4 animate-fadeIn"
        role="presentation"
      >
        <div
          ref={dialogRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all
                        animate-slideUp"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-patient-title"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 id="edit-patient-title" className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Edit Patient
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:bg-red-50 rounded-lg p-1.5 transition-colors 
           duration-200 group"
                title="Delete patient"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={firstFieldRef}
                type="text"
                className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200
                         focus:ring-2 focus:outline-none ${errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200
                         focus:ring-2 focus:outline-none ${errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Pet Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200
                         focus:ring-2 focus:outline-none ${errors.petName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                  }`}
                value={form.petName}
                onChange={(e) => handleChange("petName", e.target.value)}
              />
              {errors.petName && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.petName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Pet Birth Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200
                         focus:ring-2 focus:outline-none ${errors.petBirthDate
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                value={form.petBirthDate}
                onChange={(e) => handleChange("petBirthDate", e.target.value)}
              />
              {errors.petBirthDate && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.petBirthDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Pet Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                         focus:outline-none transition-all duration-200 bg-white"
                value={form.petType}
                onChange={(e) => handleChange("petType", e.target.value as PetType)}
              >
                {PET_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3">
            <button
              className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border 
                       border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 
                       shadow-md ${Object.keys(errors).length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover:shadow-lg"
                }`}
              onClick={save}
              disabled={Object.keys(errors).length > 0}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          patientId={patient._id}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            try {
              await fetch(`/api/patients?id=${form._id}`, {
                method: "DELETE",
              });
              onDeleted(form._id);
              setShowDeleteModal(false);
              onClose();
            } catch (err) {
              console.error("Error deleting patient:", err);
            }
          }}
        />
      )}
    </>
  );
};

export default EditPatientModal;