import PatientsTable from "./patientsTable";
import { Typography } from "@mui/material";


export const PetClinicDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 
                           bg-clip-text text-transparent">
                Pet Clinic Dashboard
              </h1>
              <Typography
                variant="body2"
                className="text-gray-600 text-sm mt-0.5"
              >
                Manage your patients efficiently
              </Typography>
            </div>
          </div>
        </div>
        <PatientsTable />
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 Pet Clinic Management System</p>
        </div>
      </div>
    </div>
  );
};