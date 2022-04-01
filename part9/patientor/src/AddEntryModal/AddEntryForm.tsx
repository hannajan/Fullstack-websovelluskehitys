import { Formik, Form, Field } from "formik";
import { Diagnosis, Entry, EntryType, EntryTypeOption, HealthRatingOption } from "../types";
import { TextField, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, FormControl, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import { useStateValue } from "../state";

export type EntryFormValues = Pick<Entry, "type" | "date" | "specialist" | "description" | "diagnosisCodes" | "healthCheckRating" | "discharge" | "employerName" | "sickLeave" >;

export interface EntryFormValuesDivided extends EntryFormValues {
  dischargeDate?: string;
  dischargeCriteria?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}

interface Props {
  onSubmit: (values: EntryFormValuesDivided) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital"},
  { value: EntryType.Occupational, label: "OccupationalHealthcare"}
];

const healthRatingOptions: HealthRatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "Increased Risk"},
  { value: 3, label: "High Risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  const diagnoseList: Diagnosis[] = Object.keys(diagnosis).map((key) => ({ 
      code: key, 
      name: diagnosis[key]
    })
  );

  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.HealthCheck,
        description: "",
        specialist:"",
        healthCheckRating: 0,
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveEndDate: "",
        sickLeaveStartDate: ""
        }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField name="type" label="Type" options={entryTypeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            /> 
            { values.type === "HealthCheck" &&
              <SelectField name="healthCheckRating" label="Health Rating" options={healthRatingOptions} />
            }
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoseList}
            />
            { values.type === "Hospital" &&
              <FormControl style={{ width: 552, marginBottom: '30px' }}>
                <Box component="span" sx={{ p: 2, border: '1px solid grey', boxShadow: 3, borderRadius: 2 }}>
                  <Typography>Discharge</Typography>
                  <Box component="span" sx={{ float: 'left', width: 140 }}> 
                    <Field
                      label="Date"
                      placeholder="YYYY-MM-DD"
                      name="dischargeDate"
                      component={TextField}
                    />
                  </Box>
                  <Box component="span" sx={{ float: 'right', width: 140 }}>
                    <Field
                      label="Criteria"
                      placeholder="Criteria"
                      name="dischargeCriteria"
                      component={TextField}
                    />
                  </Box>
                  </Box>
              </FormControl>
            }
            { values.type === "OccupationalHealthcare" &&
              <FormControl style={{ width: 552, marginBottom: '30px' }}>
                <Box component="span" sx={{ p: 2, border: '1px solid grey', boxShadow: 3, borderRadius: 2 }}>
                  <Typography>Sick Leave</Typography>
                      <Box component="div" sx={{ float: 'left', width: 150 }}> 
                        <Field
                          label="Start Date"
                          placeholder="YYYY-MM-DD"
                          name="sickLeaveStartDate"
                          component={TextField}
                        />
                      </Box>
                      <Box sx={{ float: 'left', m: 2}}>
                      <Typography component="div">
                        <Box sx={{ float: 'center', width: 20 }}> - </Box>
                      </Typography>
                      </Box>
                      <Box component="div" sx={{ float: 'left', width: 150 }}>
                        <Field
                          label="End Date"
                          placeholder="YYYY-MM-DD"
                          name="sickLeaveEndDate"
                          component={TextField}
                        />
                      </Box>
                  </Box>
              </FormControl>
            }
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                </Grid>
                <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid }
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;