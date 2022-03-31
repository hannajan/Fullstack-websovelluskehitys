import { State } from "./state";
import { Diagnose, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnose[];
  }
  | {
      type: "ADD_ENTRY";
      payload:{ entry: Entry, id: string };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose.name}),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
};

export const setDiagnosis = (diagnosis: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis,
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, id }
  };
};