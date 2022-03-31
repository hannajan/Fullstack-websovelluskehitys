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

type HealthCheckRating = 0 | 1 | 2 | 3;
 
export interface Entry {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge?: Discharge;
  sickLeave?: SickLeave;
  employerName?: string;
  healthCheckRating?: HealthCheckRating;
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export enum EntryType {
  Hospital = "Hospital",
  Occupational = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
}

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

export type HealthRatingOption = {
  value: number;
  label: string;
};