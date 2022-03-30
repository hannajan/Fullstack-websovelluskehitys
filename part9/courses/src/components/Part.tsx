import React from "react";

import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <em>{part.description}</em>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>project exercises {part.exerciseCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <em>{part.description}</em>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <em>{part.description}</em>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

export default Part;
