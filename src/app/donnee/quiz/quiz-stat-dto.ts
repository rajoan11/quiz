export class QuizStatDto {
    constructor(
      public id = 0,
      public name = '',
      public description = '',
      public created_at = '',
      public nb_of_records = 0,
      public enterprise_id = 8178,
      public enterprise_name = 'LCAS AGENCY',
      public is_anonyme = false,
      public accept_reponse = true,
      public initialize_quizz = false,
      public ending_message = '',
      public basic_color = 'fc6100',
      public rubriques = [],
      public disabled_response_message = `Il n'est plus possible de saisir de réponses dans ce formulaire...`,
      public response_inputs = []
    ) {}
}
