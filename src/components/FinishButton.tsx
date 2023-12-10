import { Dispatch } from '../types/dispatch';

interface FinishButtonProps {
  dispatch: Dispatch;
  answer: number | null;
}

const FinishButton: React.FC<FinishButtonProps> = ({ dispatch, answer }) => {
  if (answer === null) return null;
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'finishQuiz' })}
    >
      Finish
    </button>
  );
};

export default FinishButton;
