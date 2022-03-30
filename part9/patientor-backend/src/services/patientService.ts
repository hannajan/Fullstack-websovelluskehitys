import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, PublicPatient, Patient } from '../types';

const getPatients = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = ( id: string ): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(),// eslint-disable-line @typescript-eslint/no-unsafe-call
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient
};