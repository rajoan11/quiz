export class QuizzPatch {
  constructor(
    public id = null,
    public show_answer = false,
    public read_score = false,
    public initialize_quizz = false,
    public ending_message = '',
    public tilte_message = `Merci d'avoir répondu au quizz`
  ) {}
}
