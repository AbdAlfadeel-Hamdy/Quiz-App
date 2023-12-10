import { QuestionType } from './question';

export type Dispatch = React.Dispatch<{
  type: string;
  payload?: QuestionType[] | number;
}>;
