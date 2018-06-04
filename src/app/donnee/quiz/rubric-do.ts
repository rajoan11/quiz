import { Question, PointsRules, Attachement } from '.';

export class RubricDo {
  id: number;
  name: string;
  questions: Array<Question>;
  meta_contents: Array<Attachement>;
  contents_rubriques: Array<Attachement>;
  activate_points_rules: boolean;
  score: number;
  points_rules: Array<PointsRules>;
  poids: number;
}
