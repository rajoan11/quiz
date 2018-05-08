export class RubricDto {
  constructor(
    public id = 0,
    public name = '',
    public numero_order = null,
    public questions = [],
    public attachements = []
  ) {}
}
