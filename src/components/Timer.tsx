import { useEffect } from 'react';
import { Dispatch } from '../types/dispatch';

interface TimerProps {
  secondsRemaining: number;
  dispatch: Dispatch;
}

const Timer: React.FC<TimerProps> = ({ secondsRemaining, dispatch }) => {
  const minutes = Math.floor(secondsRemaining / 60).toString();
  const seconds = Math.round(secondsRemaining % 60).toString();
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className='timer'>
      {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
    </div>
  );
};

export default Timer;
