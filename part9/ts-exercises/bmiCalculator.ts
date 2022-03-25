const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obesity';
  }

  throw new Error('Give height and weight as arguments!');
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    console.log(errorMessage + ' Error: ' + error.message);
  }
  console.log(errorMessage);
}
