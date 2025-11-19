import PatientsTable from "@/components/patientsTable";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pet Clinic Dashboard</h1>

      <PatientsTable />
    </div>
  );
};


export default MyApp;
