import { RubricDto } from '.';

export class QuizDo {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  entreprise: string;
  nb_of_records: number;
  status: string;
  enterpriseUid: number;
  enterpriseName: string;
  is_anonyme: boolean;
  acceptReponse: boolean;
  showAnswer: boolean;
  readScore: boolean;
  initializeQuizz: boolean;
  endingMessage: string;
  rubrique: Array<RubricDto>;
}
