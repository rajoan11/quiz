export class RubricDto {
  constructor(
    public name = '',
    public description = '',
    public numero_order = null,
    public question = [],
    public meta_contents = [],
    public contents_rubriques = [],
    public activate_points_rules = false,
    public form = [],
    public form_id = null,
    public score = 0,
    public points_rules = [],
    public response_targetting = null,
    public rules_targetting = false
  ) {}
}
