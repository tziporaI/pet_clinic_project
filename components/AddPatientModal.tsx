import { useState, useEffect, useRef } from "react";
import { IPatient, IPatientInput, PetType } from "@/lib/interfaces";
import { usePatientValidation } from "hooks/usePatientValidation";

const PET_TYPES: PetType[] = ["Dog", "Cat", "Parrot"];

interface Props {
  onClose: () => void;
  onAdded: (patient: IPatient & { _id: string }) => void;
}

const AddPatientModal = ({ onClose, onAdded }: Props) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    petName: "",
    petBirthDate: "",
    petType: "Dog" as PetType,
  });

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


  const handleChange = (k: keyof typeof form, v: any) => {
    setForm({ ...form, [k]: v });
    validate(k, v); 
  };

  const addPatient = async () => {
    if (Object.keys(errors).length > 0) return;

    const finalPatient: IPatientInput = {
      name: form.name,
      phone: form.phone,
      petName: form.petName,
      petBirthDate: form.petBirthDate,
      petType: form.petType,
    };

    try {
      const res = await fetch(`/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPatient),
      });

      const data = await res.json();

      if (data.patients?.insertedId) {
        onAdded({ ...finalPatient, _id: data.patients.insertedId });
        onClose();
      }
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  return (
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
        aria-labelledby="add-patient-title"
      >
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2
              id="add-patient-title"
              className="text-xl font-bold text-white flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
              Add New Patient
            </h2>
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
                       focus:ring-2 focus:outline-none ${
                errors.name 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-emerald-200 focus:border-emerald-500"
              }`}
              placeholder="Enter owner's name"
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
                       focus:ring-2 focus:outline-none ${
                errors.phone 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-emerald-200 focus:border-emerald-500"
              }`}
              placeholder="05X-XXXXXXX"
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
                       focus:ring-2 focus:outline-none ${
                errors.petName 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-emerald-200 focus:border-emerald-500"
              }`}
              placeholder="Enter pet's name"
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
                       focus:ring-2 focus:outline-none ${
                errors.petBirthDate 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-emerald-200 focus:border-emerald-500"
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
                       focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 
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
                     shadow-md ${
              Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg"
            }`}
            disabled={Object.keys(errors).length > 0}
            onClick={addPatient}
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;