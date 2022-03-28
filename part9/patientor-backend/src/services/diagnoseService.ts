import diagnoseData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = () => {
  return diagnoses;
};

export default {
  getDiagnoses,
};