import { QuizDto } from '../../donnee/quiz';
export abstract class QuizCudBusinessDelegateServiceACI {
  public abstract createQuiz(Quiz: QuizDto);
  public abstract updateQuiz(Quiz: QuizDto);
  public abstract deleteQuiz(QuizId: number);
}
