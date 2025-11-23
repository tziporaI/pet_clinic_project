export const validatePatientInput = (data: any) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;
  const petNameRegex = /^[A-Za-z\s]+$/;

  // Name
  if (!data.name || !nameRegex.test(data.name)) {
    return "Name must contain letters only.";
  }

  // Phone
  if (!data.phone || !phoneRegex.test(data.phone)) {
    return "Phone must be 10 digits and start with 05.";
  }

  // Pet Name
  if (!data.petName || !petNameRegex.test(data.petName)) {
    return "Pet name must contain letters only.";
  }

  // Birth Date
  const birth = new Date(data.petBirthDate);
  const today = new Date();
  if (Number.isNaN(birth.getTime())) {
    return "Invalid birth date format.";
  }
  if (birth > today) {
    return "Birth date cannot be in the future.";
  }

  return null;  
};
