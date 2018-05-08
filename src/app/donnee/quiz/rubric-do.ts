import { Question } from '.';
import { Attachement } from '.';

export class RubricDo {
  id: number;
  name: string;
  numero_order: number;
  questions: Array<Question>;
  attachements: Array<Attachement>;
}
