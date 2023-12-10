import { Dispatch } from '../types/dispatch';
import { QuestionType } from '../types/question';

interface OptionsProps {
  question: QuestionType;
  dispatch: Dispatch;
  answer: null | number;
}

const Options: React.FC<OptionsProps> = ({ question, answer, dispatch }) => {
  return (
    <div className='options'>
      {question.options.map((option, i) => (
        <button
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${answer === i ? 'answer' : ''} ${
            answer && (question.correctOption === i ? 'correct' : 'wrong')
          }`}
          onClick={() => {
            dispatch({
              type: 'newAnswer',
              payload: i,
            });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
