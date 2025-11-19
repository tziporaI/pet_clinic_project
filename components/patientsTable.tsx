import { useEffect, useState } from "react";
import { IPatient } from "@/lib/interfaces";

const PatientsTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

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
            <th className="border p-3 text-left font-semibold">Name</th>
            <th className="border p-3 text-left font-semibold">Phone</th>
            <th className="border p-3 text-left font-semibold">Pet Name</th>
            <th className="border p-3 text-left font-semibold">Pet Age</th>
            <th className="border p-3 text-left font-semibold">Pet Type</th>
            <th className="border p-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="border p-3">{p.name}</td>
              <td className="border p-3">{p.phone}</td>
              <td className="border p-3">{p.petName}</td>
              <td className="border p-3">{p.petAge}</td>
              <td className="border p-3">{p.petType}</td>
              <td className="border p-3 text-center">
                <button className="text-blue-600 hover:underline">
                  Edit ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
