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

interface Input {
  input1: Array<number>;
  input2: number;
}

const parseInputArguments = (args: Array<string>): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = args.slice(3);
  const input1 = <number[]>[];

  hours.forEach((a) => {
    if (isNaN(Number(a))) throw new Error('Given arguments must be numbers');
    input1.push(Number(a));
  });

  return {
    input1,
    input2: Number(args[2]),
  };
};

function giveRating(average: number, target: number): Rating {
  const percent = average / target;
  let rating;
  let ratingDescription;

  if (percent >= 1) {
    rating = 3;
    ratingDescription = 'target met during period';
  } else if (percent >= 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'fell far behind from initial target';
  }

  return { rating, ratingDescription };
}

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

try {
  const { input1, input2 } = parseInputArguments(process.argv);
  console.log(calculateExercises(input1, input2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage = errorMessage + ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
