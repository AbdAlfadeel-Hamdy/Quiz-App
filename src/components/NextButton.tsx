import { Dispatch } from '../types/dispatch';

interface NextButtonProps {
  dispatch: Dispatch;
  answer: number | null;
  index: number;
  numQuestions: number;
  status: string;
}

const NextButton: React.FC<NextButtonProps> = ({
  dispatch,
  answer,
  index,
  numQuestions,
  status,
}) => {
  if (status === 'finished')
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    );
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
};

export default NextButton;
