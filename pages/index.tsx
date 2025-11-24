import { PetClinicDashboard } from "@/components/pet-clinic-dashboard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <PetClinicDashboard />
      <style jsx>{`
        :global(body) {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Home;
