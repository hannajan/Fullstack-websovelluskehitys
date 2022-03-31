import { Entry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { style } from './entryStyle';
import Diagnosis from "./Diagnosis";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {

  return (
    <div key={entry.id} style={style}>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <em>{entry.description}</em>
      {entry.diagnosisCodes
        ? <Diagnosis diagnoseCodes={entry.diagnosisCodes} />
        : <></>
      }
      <p>diagnosed by {entry.specialist}</p>
      {entry.discharge
      ? <p>discharged: {entry.discharge.date} <em>{entry.discharge.criteria}</em></p>
      : <></>
      }

    </div>
  );
};

export default HospitalEntry;