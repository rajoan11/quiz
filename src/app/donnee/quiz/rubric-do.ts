import { Question } from '.';
import { Attachement } from '.';

export class RubricDo {
  id: number;
  name: string;
  numero_order: number;
  questions: Array<Question>;
  attachements: Array<Attachement>;
  activate_points_rules: boolean;
  score: number;
}
