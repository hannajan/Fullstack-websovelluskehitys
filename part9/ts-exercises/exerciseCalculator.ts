interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface InputValues {
  value1: Array<number>;
  value2: number;
}

const giveRating = (average: number, target: number): Rating => {
  const percent = average / target;
  let rating;
  let ratingDescription;

  if (percent >= 1) {
    rating = 3;
    ratingDescription = 'target met during period';
  } else if (percent >= 0.9) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'fell far behind from initial target';
  }

  return { rating, ratingDescription };
};

const calculateExercises = (
  hoursPerDay: Array<number>,
  target: number
): Result => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((hours) => hours !== 0).length;
  const average =
    hoursPerDay.reduce((prev, curr) => {
      return (prev += curr);
    }, 0) / periodLength;
  const success = average >= target;
  const { rating, ratingDescription } = giveRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
