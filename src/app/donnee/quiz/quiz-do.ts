import { RubricDto } from '.';

export class QuizDo {
  id: number;
  name: string;
  description: string;
  created_date: Date;
  entreprise: string;
  response: string;
  status: string;
  enterpriseUid: number;
  enterpriseName: string;
  isAnonyme: boolean;
  acceptReponse: boolean;
  showAnswer: boolean;
  readScore: boolean;
  initializeQuizz: boolean;
  endingMessage: string;
  rubrique: Array<RubricDto>;
}
