import { QuizDto } from '../../donnee/quiz';
export abstract class QuizReadApplicatifServiceACI {
  public abstract getQuiz(quizId: number);
  public abstract getQuizs(params: any);
}
