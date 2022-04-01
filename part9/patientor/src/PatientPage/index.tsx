import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient, addEntry } from "../state"; 
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { EntryFormValues, EntryFormValuesDivided } from "../AddEntryModal/AddEntryForm";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";

const GenderIcon: React.FC<{ gender: string }> = ({ gender }) => {
  switch (gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      return null;
  }
};

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );
  const entries = patient?.entries;


  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientFromApi));
    };

    if (!patient || !patient.ssn || !patient.entries) {
      void fetchPatient();
    }
  }, [dispatch, patient]);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const parseValues = (values: EntryFormValuesDivided): EntryFormValues => {
    const selectedValues: EntryFormValues = {
      type: values.type,
      date: values.date,
      description: values.description,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : undefined
    };

    switch (values.type) {
      case "HealthCheck":
        return {
          ...selectedValues,
          healthCheckRating: values.healthCheckRating
        };
      case "Hospital":
        return {
          ...selectedValues,
          discharge: {
            date: values.dischargeDate,
            criteria: values.dischargeCriteria
          }
        };
      case "OccupationalHealthcare":
        return {
          ...selectedValues,
          sickLeave: {
            startDate: values.sickLeaveStartDate,
            endDate: values.sickLeaveEndDate
          }
        };
      default:
        return selectedValues;
    }
  };

  const submitNewEntry = async (values: EntryFormValuesDivided) => {
    
    const selectedValues = parseValues(values);
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Entry>(  
          `${apiBaseUrl}/patients/${id}/entries`,
          selectedValues
        );
        dispatch(addEntry(newEntry, id));
      }
        closeModal(); 
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </h2>
      {patient.ssn ? <p>ssn: {patient.ssn}</p> : null}
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {entries?.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button variant="contained" onClick={openModal}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
