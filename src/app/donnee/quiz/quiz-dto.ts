export class QuizDto {
  constructor(
    public id = 0,
    public name = '',
    public description = '',
    public created_date = '',
    public entreprise = '',
    public response = '',
    public status = '',
    public enterpriseUid = null,
    public enterpriseName = '',
    public isAnonyme = true,
    public acceptReponse = true,
    public showAnswer = false,
    public readScore = false,
    public initializeQuizz = true,
    public endingMessage = '',
    public rubrique = []
  ) {}
}
