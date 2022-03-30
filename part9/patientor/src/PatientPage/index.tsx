import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

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

  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

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

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </h2>
      {patient.ssn ? <p>ssn: {patient.ssn}</p> : null}
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
