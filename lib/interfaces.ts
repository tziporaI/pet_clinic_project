export interface IPatientInput {
  name: string;
  phone: string;
  petName: string;
  petAge: number;
  petType: string;
}

export interface IPatient extends IPatientInput {
  _id: string;
}