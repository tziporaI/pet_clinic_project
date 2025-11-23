export interface IPatientInput {
  name: string;
  phone: string;
  petName: string;
  petBirthDate: string;
  petType: "Dog" | "Cat" | "Parrot";

}
export type PetType = IPatientInput["petType"];

export interface IPatient extends IPatientInput {
  _id: string;
}
export interface Props {
  patientId: string;
  onClose: () => void;
  onConfirm: () => void;
}