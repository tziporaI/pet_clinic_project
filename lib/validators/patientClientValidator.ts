export const validatePatientField = (field: string, value: string) => {
  if (field === "name") {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Name must contain letters only.";
    }
  }

  if (field === "phone") {
    if (!/^05\d{8}$/.test(value)) {
      return "Phone must be 10 digits and start with 05.";
    }
  }

  if (field === "petName") {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Pet name must contain letters only.";
    }
  }

  if (field === "petBirthDate") {
    const birth = new Date(value);
    const today = new Date();
    if (birth > today) {
      return "Birth date cannot be in the future.";
    }
  }

  return "";
};
