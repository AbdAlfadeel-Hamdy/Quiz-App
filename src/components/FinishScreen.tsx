interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
}

const FinishScreen: React.FC<FinishScreenProps> = ({
  points,
  maxPossiblePoints,
  highscore,
}) => {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let emoji: string;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙂';
  if (percentage > 0 && percentage < 50) emoji = '🤨';
  else emoji = '😞';
  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className='high-score'>(Highscore: {highscore} points)</p>
    </>
  );
};

export default FinishScreen;
