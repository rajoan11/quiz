export class QuizzPatch {
  constructor(
    public id = null,
    public show_answer = false,
    public read_score = false,
    public initialize_quizz = false,
    public ending_message = '',
    public tilte_message = ``,
    public title_ending_message = `Merci d'avoir répondu au quizz`,
    public disabled_response_message = 'Il n\'est plus possible de saisir des réponses dans ce formulaire' ,
    public accept_reponse = true
  ) {}
}
