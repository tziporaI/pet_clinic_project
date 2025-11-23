import PatientsTable from "./patientsTable";

export const PetClinicDashboard = () => {
  return (
    <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 max-w-screen-lg mx-auto">
      <Title />
      <PatientsTable />
    </div>
  );
};

const Title = () => {
  return (
    <h1 className="text-primary font-bold text-3xl">Pet Clinic Dashboard</h1>
  );
};