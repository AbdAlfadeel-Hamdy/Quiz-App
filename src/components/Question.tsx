import { Dispatch } from '../types/dispatch';
import { QuestionType } from '../types/question';
import Options from './Options';

interface OptionsProps {
  question: QuestionType;
  dispatch: Dispatch;
  answer: null | number;
}

const Question: React.FC<OptionsProps> = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
