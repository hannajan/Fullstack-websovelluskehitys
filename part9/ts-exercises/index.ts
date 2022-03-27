import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error: unknown) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {

  if(!req.body) {
    return res.status(400).send({ error: "request body missing"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if(!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing"});
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(typeof daily_exercises !== 'object'|| daily_exercises.some(isNaN) || typeof target !== 'number' ) { //eslint-disable-line @typescript-eslint/no-unsafe-call
    return res.status(400).send({ error: "malformatted parameters"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercises: Array<number> = daily_exercises;

   const result = calculateExercises(exercises, target);
   return res.send(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
