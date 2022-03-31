import {
  Gender,
  NewPatient,
  NewEntryWithDetails,
  Discharge,
  SickLeave,
  EntryType,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSSN(ssn),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Type missing");
  }
  return type;
};

type EntryFields = {
  date: unknown;
  type: unknown;
  description: unknown;
  specialist: unknown;
  diagnosisCodes: string[];
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
  healthCheckRating: number;
};

export const toNewEntry = ({
  date,
  type,
  description,
  specialist,
  diagnosisCodes,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating
}: EntryFields) => {
  const newEntry: NewEntryWithDetails = {
    date: parseDate(date),
    type: parseType(type),
    description: parseDescription(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes,
    discharge,
    employerName,
    sickLeave,
    healthCheckRating
  };
  return newEntry;
};

export default toNewPatient;
