export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = Pick<
  Patient,
  "name" | "dateOfBirth" | "gender" | "occupation" | "ssn"
>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry
  | NewEntryWithDetails;


export type NewEntry = Omit<BaseEntry, 'id'>;

export enum EntryType {
  Hospital = "Hospital",
  Occupational =  "OccupationalHealthcare",
  HealthCheck =  "HealthCheck"
}

export interface NewEntryWithDetails extends NewEntry {
  type: EntryType;
  discharge?: Discharge;
  employerName?: string;
  sickLeave?: SickLeave;
  healthCheckRating?: HealthCheckRating;
}