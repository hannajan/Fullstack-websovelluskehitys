import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientService.getPatient(id);
    if(!patient) {
      throw new Error('Patient not found.');
    }
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if ( error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/', (req, res) => {
  try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newPatient = toNewPatient(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;
