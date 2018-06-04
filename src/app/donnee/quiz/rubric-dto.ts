export class RubricDto {
  constructor(
    public name = '',
    public description = '',
    public questions = [],
    public meta_contents = [],
    public contents_rubriques = [],
    public activate_points_rules = false,
    public score = 0,
    public points_rules = [],
    public poids = null
  ) {}
}
