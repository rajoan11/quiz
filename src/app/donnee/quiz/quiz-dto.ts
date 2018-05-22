export class QuizDto {
  constructor(
    public id = 0,
    public name = '',
    public description = '',
    public created_at = '',
    public entreprise = '',
    public nb_of_records = 0,
    public status = '',
    public enterprise_id = 8178,
    public enterprise_name = 'LCAS AGENCY',
    public is_anonyme = true,
    public accept_reponse = true,
    public show_answer = false,
    public read_score = false,
    public initialize_quizz = true,
    public ending_message = '',
    public rubriques = []
  ) {}
}
