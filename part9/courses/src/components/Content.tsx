import React from 'react';

export interface CoursePart {
  name: string;
  exerciseCount:number;
}

export interface CourseParts {
  courseParts: CoursePart[]
}

const Content: React.FC<CourseParts> = ({ courseParts }) => {
  const content = courseParts.map(({ name, exerciseCount }: CoursePart) => 
    <p key={name}>{name} {exerciseCount}</p>
  );

  return (
    <div>
      {content}
    </div>
  );
};

export default Content;