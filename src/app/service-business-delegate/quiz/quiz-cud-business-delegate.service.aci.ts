import { QuizDto, QuizzPatch } from '../../donnee/quiz';
export abstract class QuizCudBusinessDelegateServiceACI {
  public abstract createQuiz(Quiz: any);
  public abstract updateQuiz(Quiz: any);
  public abstract deleteQuiz(QuizId: number);
  public abstract changeStatusQuiz(QuizId: number);
  public abstract finishQuizz(quizzPatch: QuizzPatch);
}
