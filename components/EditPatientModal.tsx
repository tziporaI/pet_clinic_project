// components/EditPatientModal.tsx
import { useState } from "react";
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
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

        {/* MODAL */}
        <div className="bg-white p-6 rounded shadow-lg w-[350px] relative">

          {/* TRASH ICON */}
          <img
            src="/trash.png"
            alt="delete"
            className="w-5 h-5 absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowDeleteModal(true)}
          />

          <h2 className="text-xl font-semibold mb-4">Edit patient</h2>

          {/* Name */}
          <label className="block text-sm font-bold">Name</label>
          <input
            className={`border w-full p-1 mb-1 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mb-2">{errors.name}</p>}

          {/* Phone */}
          <label className="block text-sm font-bold">Phone</label>
          <input
            className={`border w-full p-1 mb-1 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mb-2">{errors.phone}</p>}

          {/* Pet Name */}
          <label className="block text-sm font-bold">Pet Name</label>
          <input
            className={`border w-full p-1 mb-1 ${errors.petName ? "border-red-500" : "border-gray-300"}`}
            value={form.petName}
            onChange={(e) => handleChange("petName", e.target.value)}
          />
          {errors.petName && <p className="text-red-500 text-xs mb-2">{errors.petName}</p>}

          {/* Pet Birthdate */}
          <label className="block text-sm font-bold">Pet Birth Date</label>
          <input
            type="date"
            className={`border w-full p-1 mb-1 ${errors.petBirthDate ? "border-red-500" : "border-gray-300"}`}
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

          {/* BUTTONS */}
          <div className="flex justify-between mt-3">
            <button
              className={`px-4 py-1 rounded text-white ${
                Object.keys(errors).length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={save}
              disabled={Object.keys(errors).length > 0}
            >
              Save
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

      {/* DELETE CONFIRM MODAL */}
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
