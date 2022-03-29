import React from 'react';
import { CourseParts } from './Content';

const Total: React.FC<CourseParts> = ({ courseParts }) => (
    <div>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );


export default Total;
