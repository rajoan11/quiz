export class QuizDto {
  constructor(
    public id = 0,
    public name = '',
    public description = '',
    public created_at = '',
    public enterprise_forms = [],
    public nb_of_records = 0,
    public status = '',
    public enterprise_id = 8178,
    public enterprise_name = 'LCAS AGENCY',
    public is_anonyme = true,
    public accept_reponse = true,
    public show_answer = true,
    public read_score = true,
    public initialize_quizz = false,
    public ending_message = '',
    public rubriques = []
  ) {}
}
