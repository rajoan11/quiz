import { RubricDto } from '.';

export class QuizDo {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  enterprise_forms: Array<any>;
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
  basic_color: string;
  rubriques: Array<RubricDto>;
}
