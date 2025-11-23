import { useState } from "react";
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
      const res = await fetch("/api/patients", {
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          + Add patient
        </h2>

        {/* Name */}
        <label className="block text-sm font-bold">Name</label>
        <input
          className={`border w-full p-1 mb-1 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name}</p>
        )}

        {/* Phone */}
        <label className="block text-sm font-bold">Phone</label>
        <input
          className={`border w-full p-1 mb-1 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
        )}

        {/* Pet Name */}
        <label className="block text-sm font-bold">Pet Name</label>
        <input
          className={`border w-full p-1 mb-1 ${
            errors.petName ? "border-red-500" : "border-gray-300"
          }`}
          value={form.petName}
          onChange={(e) => handleChange("petName", e.target.value)}
        />
        {errors.petName && (
          <p className="text-red-500 text-xs mb-2">{errors.petName}</p>
        )}

        {/* Pet Birth Date */}
        <label className="block text-sm font-bold">Pet Birth Date</label>
        <input
          type="date"
          className={`border w-full p-1 mb-1 ${
            errors.petBirthDate ? "border-red-500" : "border-gray-300"
          }`}
          value={form.petBirthDate}
          onChange={(e) => handleChange("petBirthDate", e.target.value)}
        />
        {errors.petBirthDate && (
          <p className="text-red-500 text-xs mb-2">{errors.petBirthDate}</p>
        )}

        {/* Pet Type */}
        <label className="block text-sm font-bold">Pet Type</label>
        <select
          className="border w-full p-1 mb-4"
          value={form.petType}
          onChange={(e) => handleChange("petType", e.target.value as PetType)}
        >
          {PET_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className={`px-4 py-1 rounded text-white ${
              Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500"
            }`}
            disabled={Object.keys(errors).length > 0}
            onClick={addPatient}
          >
            Add
          </button>

          <button
            className="bg-gray-300 px-4 py-1 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
