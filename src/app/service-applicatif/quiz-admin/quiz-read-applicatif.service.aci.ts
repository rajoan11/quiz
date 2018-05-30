import { QuizDto } from '../../donnee/quiz';
export abstract class QuizReadApplicatifServiceACI {
  public abstract getQuiz(quizId: number);
  public abstract getQuizs(params: any);
  public abstract getQuestion();
  public abstract getEnterprises();
  public abstract getColors();
  public abstract getContraintes();
  public abstract getFontawesomes();
}
