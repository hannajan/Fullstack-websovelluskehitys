import { Entry } from "../types";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { style } from './entryStyle';
import Diagnosis from "./Diagnosis";

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {

  return (
    <div key={entry.id} style={style}>
      <p>{entry.date} <WorkHistoryIcon /> {entry.employerName}</p>
      {entry.sickLeave
        ? <p>sick leave: <em>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</em></p>
        : <></>
      }
      <em>{entry.description}</em>
      {entry.diagnosisCodes
        ? <Diagnosis diagnoseCodes={entry.diagnosisCodes} />
        : <></>
      }
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;