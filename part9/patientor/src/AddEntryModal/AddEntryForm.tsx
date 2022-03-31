import { Formik, Form, Field } from "formik";
import { Diagnosis, Entry, EntryType, EntryTypeOption, HealthRatingOption } from "../types";
import { TextField, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

export type EntryFormValues = Pick<Entry, "type" | "date" | "specialist" | "description" | "diagnosisCodes" | "healthCheckRating" >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" }
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
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
            <SelectField name="healthCheckRating" label="Health Rating" options={healthRatingOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoseList}
            />
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