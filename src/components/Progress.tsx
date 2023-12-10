interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}

const Progress: React.FC<ProgressProps> = ({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) => {
  return (
    <header className='progress'>
      <progress value={answer ? index + 1 : index} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
