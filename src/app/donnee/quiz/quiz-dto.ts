export class QuizDto {
  constructor(
    public id = 0,
    public name = '',
    public description = '',
    public created_date = '',
    public entreprise = '',
    public response = '',
    public status = ''
  ) {}
}
