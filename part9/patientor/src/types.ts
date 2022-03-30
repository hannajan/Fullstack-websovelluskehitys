export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Entry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string[];
  discharge?: Discharge;
  sickLeave?: SickLeave;
}
