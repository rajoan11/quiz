import { Question, PointsRules, Attachement } from '.';

export class RubricDo {
  id: number;
  name: string;
  numero_order: number;
  question: Array<Question>;
  meta_contents: Array<Attachement>;
  contents_rubriques: Array<Attachement>;
  activate_points_rules: boolean;
  form: any;
  form_id: number;
  score: number;
  points_rules: Array<PointsRules>;
}
