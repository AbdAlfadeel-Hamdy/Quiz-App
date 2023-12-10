import { useEffect, useReducer } from 'react';
import {
  Header,
  Loader,
  Error as ErrorEl,
  StartScreen,
  Question,
  NextButton,
  Progress,
  FinishScreen,
  Timer,
  Footer,
} from './components';
import { QuestionType } from './types/question';

interface State {
  index: number;
  points: number;
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  answer: null | number;
  highscore: number;
  secondsRemaining: number;
}

const SECS_PER_QUESTION = 30;

const initialState: State = {
  index: 0,
  points: 0,
  questions: [],
  status: 'loading',
  answer: null,
  highscore: 0,
  secondsRemaining: 0,
};

const reducer = (
  state: State,
  action: { type: string; payload?: QuestionType[] | number }
): State => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: (action.payload as QuestionType[]) || [],
        status: 'ready',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload as number | null,
        points:
          state.points +
          (action.payload === state.questions[state.index].correctOption
            ? state.questions[state.index].points
            : 0),
      };
    case 'nextQuestion':
      return { ...state, answer: null, index: state.index + 1 };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
        highscore: state.highscore,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Action unknown');
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  // Load Questions
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:9000/questions');
        const data = await res.json();
        dispatch({
          type: 'dataReceived',
          payload: data,
        });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    })();
  }, []);

  return (
    <div className='app'>
      <Header />
      <main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorEl />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                status={status}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              status={status}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
