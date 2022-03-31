import React from 'react';
import { Entry } from "../types";
import { green, yellow, orange, red } from "@mui/material/colors";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { style } from './entryStyle';
import Diagnosis from "./Diagnosis";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  type Color = typeof green[500] | typeof yellow[500] | typeof orange[500] | typeof red[500];

  let colorForIcon: Color = green[500];

  switch (entry.healthCheckRating) {
    case 0:
      colorForIcon = green[500];
      break;
    case 1:
      colorForIcon = yellow[500];
      break;
    case 2:
      colorForIcon = orange[500];
      break;
    case 3:
      colorForIcon = red[500];
      break;
    default:
      colorForIcon = green[500];
      break;
  }

  return (
    <div key={entry.id} style={style}>
      <p>{entry.date} <FactCheckIcon/></p>
      <em>{entry.description}</em>
      {entry.diagnosisCodes
        ? <Diagnosis diagnoseCodes={entry.diagnosisCodes} />
        : <></>
      }
      <div>
        <FavoriteIcon sx={{ color: colorForIcon, fontSize: 30 }} />
      </div>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;