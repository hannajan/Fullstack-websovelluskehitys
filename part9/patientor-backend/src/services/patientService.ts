import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(),// eslint-disable-line @typescript-eslint/no-unsafe-call
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};