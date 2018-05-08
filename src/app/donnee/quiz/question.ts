export class Question {
  type: string;
  value: string;
  requirred: boolean;
  error_message: string;
  validator: Array<any>;
}
