import { useStateValue } from "../state";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

const Diagnosis: React.FC<{diagnoseCodes : string[]}>= ({ diagnoseCodes }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Table>
      <TableBody>
        {diagnoseCodes.map(code => 
          <TableRow key={code}>
          <TableCell>
            {code}
          </TableCell>
          <TableCell>
            {diagnosis[code]}
          </TableCell>
        </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Diagnosis;