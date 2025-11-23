import { useState } from "react";
import { validatePatientField } from "@/lib/validators/patientClientValidator";

export const usePatientValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (field: string, value: string) => {
    const error = validatePatientField(field, value);

    setErrors((prev) => {
      const updated = { ...prev };

      if (error) {
        updated[field] = error;
      } else {
        delete updated[field];
      }

      return updated;
    });
  };

  return { errors, validate };
};
