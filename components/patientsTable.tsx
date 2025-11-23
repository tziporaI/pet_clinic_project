import { useEffect, useState } from "react";
import { IPatient, PetType } from "@/lib/interfaces";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";

/** Literal array for pet types */
const PET_TYPES = ["Dog", "Cat", "Parrot"] as const;

const PatientsTable = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [searchPetName, setSearchPetName] = useState("");

  // Pet type filter
  const [showFilter, setShowFilter] = useState(false);
  const [petTypesFilter, setPetTypesFilter] = useState<
    Record<PetType, boolean>
  >({
    Dog: false,
    Cat: false,
    Parrot: false,
  });

  // ADD modal
  const [showAddModal, setShowAddModal] = useState(false);

  // EDIT modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  /** Filtered results */
  const filteredPatients = patients
    .filter((p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((p) =>
      p.petName.toLowerCase().includes(searchPetName.toLowerCase())
    )
    .filter((p) => {
      const allOff = Object.values(petTypesFilter).every(v => v === false);
      if (allOff) return true;
      return petTypesFilter[p.petType] === true;
    });
  const calculateAge = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    const diffMs = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days`;
    }

    const diffMonths =
      today.getFullYear() * 12 +
      today.getMonth() -
      (birthDate.getFullYear() * 12 + birthDate.getMonth());

    if (diffMonths < 12) {
      const monthFraction = (today.getDate() - birthDate.getDate()) / 30;
      const preciseMonths = Number((diffMonths + monthFraction).toFixed(1));
      return `${preciseMonths} months`;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const decimalAge = Number((years + months / 12).toFixed(2));
    return `${decimalAge} years`;
  };

  /** Load patients */
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();
        setPatients(data.patients || []);
      } catch (err) {
        console.error("Failed to load patients", err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  if (loading) return <div className="p-6 text-xl">Loading...</div>;

  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="w-full border-collapse shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {/* NAME + SEARCH */}
            <th className="border p-3 text-left font-semibold align-top">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span>Name</span>
                </div>

                <div className="flex items-center border rounded bg-white h-7 w-28 px-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="flex-1 outline-none text-xs bg-transparent"
                  />
                  <img
                    src="/find.svg"
                    className="w-3 h-3 opacity-70 ml-1"
                    alt="search"
                  />
                </div>
              </div>
            </th>

            {/* PHONE */}
            <th className="border p-3 text-left font-semibold">Phone</th>

            {/* PET NAME + SEARCH */}
            <th className="border p-3 text-left font-semibold align-top">
              <div className="flex flex-col gap-1">
                <span>Pet Name</span>

                <div className="flex items-center border rounded bg-white h-7 w-28 px-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchPetName}
                    onChange={(e) => setSearchPetName(e.target.value)}
                    className="flex-1 outline-none text-xs bg-transparent"
                  />
                  <img
                    src="/find.svg"
                    className="w-3 h-3 opacity-70 ml-1"
                    alt="search"
                  />
                </div>
              </div>
            </th>

            {/* PET AGE */}
            <th className="border p-3 text-left font-semibold">Pet Age</th>

            {/* PET TYPE FILTER */}
            <th className="border p-3 text-left font-semibold align-top relative min-w-[120px]">
              <div className="flex items-center gap-2">
                <span>Pet Type</span>

                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="text-xs border px-2 rounded bg-white"
                >
                  ▼
                </button>
              </div>

              {showFilter && (
                <div
                  className="
                    absolute 
                    left-0 
                    top-full 
                    mt-1
                    w-32
                    bg-white 
                    shadow-lg 
                    rounded 
                    p-2 
                    z-50
                  "
                >
                  {PET_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={petTypesFilter[type]}
                        onChange={() =>
                          setPetTypesFilter((prev) => ({
                            ...prev,
                            [type]: !prev[type],
                          }))
                        }
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </th>

            {/* ACTIONS */}
            <th className="border p-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {filteredPatients.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.phone}</td>
              <td className="border p-2">{p.petName}</td>
              <td className="border p-2">{calculateAge(p.petBirthDate)}</td>
              <td className="border p-2">{p.petType}</td>
              <td className="border p-2 text-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setSelectedPatient(p);
                    setShowEditModal(true);
                  }}
                >
                  Edit ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD NEW PATIENT BUTTON */}
      <div className="mt-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 text-lg text-blue-600 hover:underline"
        >
          + Add new patient
        </button>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onAdded={(newPatient) => setPatients([...patients, newPatient])}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && selectedPatient && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            setPatients((prev) =>
              prev.map((x) => (x._id === updated._id ? updated : x))
            );
          }}
          onDeleted={(id) => {
            setPatients((prev) => prev.filter((x) => x._id !== id));
          }}
        />
      )}
    </div>
  );
};

export default PatientsTable;
