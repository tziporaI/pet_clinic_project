import { useEffect, useState } from "react";
import { IPatient, PetType } from "@/lib/interfaces";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";

const PET_TYPES = ["Dog", "Cat", "Parrot"] as const;

const SearchIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const PatientsTable = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchPetName, setSearchPetName] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [petTypesFilter, setPetTypesFilter] = useState<Record<PetType, boolean>>({
    Dog: false,
    Cat: false,
    Parrot: false,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const filteredPatients = patients
    .filter((p) => p.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((p) => p.petName.toLowerCase().includes(searchPetName.toLowerCase()))
    .filter((p) => {
      const allOff = Object.values(petTypesFilter).every(v => v === false);
      if (allOff) return true;
      return petTypesFilter[p.petType] === true;
    });


  const calculateAge = (dob: string): string => {
    {
      const birthDate = typeof dob === "string" ? new Date(dob) : dob;
      const now = new Date();

      if (isNaN(birthDate.getTime()) || birthDate > now) {
        return "";
      }

      const MS_IN_DAY = 1000 * 60 * 60 * 24;
      const diffMs = now.getTime() - birthDate.getTime();
      const diffDays = Math.floor(diffMs / MS_IN_DAY);

      if (diffDays < 14) {
        return diffDays === 1 ? "1 day" : `${diffDays} days`;
      }
      if (diffDays < 60) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? "1 week" : `${weeks} weeks`;
      }
      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();
      if (days < 0) {
        months -= 1;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      const totalMonths = years * 12 + months;
      if (years === 0 && totalMonths < 24) {
        return totalMonths === 1 ? "1 month" : `${totalMonths} months`;
      }
      if (months === 0) {
        return years === 1 ? "1 year" : `${years} years`;
      }
      const yearsPart = years === 1 ? "1 year" : `${years} years`;
      const monthsPart = months === 1 ? "1 month" : `${months} months`;
      return `${yearsPart} ${monthsPart}`;
    };
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Patients List
          </h2>
        </div>

              <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">

                {/* Name + Search */}
                <th className="px-4 py-3 text-left align-top">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </span>
                    <div className="relative w-32">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full pl-8 pr-2 py-1 text-xs border border-gray-300 rounded-md 
                                 focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                                 transition-all duration-200"
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                </th>

                {/* Phone */}
                <th className="px-4 py-3 text-left align-top">
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </span>
                </th>

                {/* Pet Name + Search */}
                <th className="px-4 py-3 text-left align-top">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Pet Name
                    </span>
                    <div className="relative w-32">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchPetName}
                        onChange={(e) => setSearchPetName(e.target.value)}
                        className="w-full pl-8 pr-2 py-1 text-xs border border-gray-300 rounded-md 
                                 focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                                 transition-all duration-200"
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                </th>

                {/* Pet Age */}
                <th className="px-4 py-3 text-left align-top">
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Pet Age
                  </span>
                </th>

                {/* Pet Type + Filter */}
                <th className="px-4 py-3 text-left align-top relative">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Pet Type
                    </span>
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
                               transition-colors duration-200 shadow-sm"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </button>
                  </div>

                  {showFilter && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 
                                  rounded-xl shadow-xl z-50 p-3 animate-fadeIn">
                      <div className="space-y-2">
                        {PET_TYPES.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 
                                     cursor-pointer transition-colors duration-200"
                          >
                            <input
                              type="checkbox"
                              checked={petTypesFilter[type]}
                              onChange={() =>
                                setPetTypesFilter((prev) => ({
                                  ...prev,
                                  [type]: !prev[type],
                                }))
                              }
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-2 
                                       focus:ring-emerald-500 cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 font-medium">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </th>

                {/* Actions */}
                <th className="px-4 py-3 text-center align-top">
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </span>
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg">No patients found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p, idx) => (
                  <tr
                    key={p._id}
                    className="hover:bg-emerald-50/50 transition-colors duration-150 group"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{p.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{p.phone}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{p.petName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs 
                                     font-medium bg-blue-100 text-blue-800">
                        {calculateAge(p.petBirthDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs 
                                      font-medium ${p.petType === 'Dog'
                          ? 'bg-amber-100 text-amber-800'
                          : p.petType === 'Cat'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {p.petType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedPatient(p);
                          setShowEditModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                                 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 
                                 transition-colors duration-200"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold 
                     text-white bg-gradient-to-r from-emerald-500 to-teal-600 
                     rounded-lg hover:from-emerald-600 hover:to-teal-700 
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                     transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Patient
          </button>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onAdded={(newPatient) => setPatients([...patients, newPatient])}
        />
      )}

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