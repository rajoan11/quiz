import { QuizDto, QuizzPatch } from '../../donnee/quiz';
export abstract class QuizCudMetierServiceACI {
  public abstract createQuiz(quiz: QuizDto);
  public abstract updateQuiz(quiz: QuizDto);
  public abstract deleteQuiz(quizId: number);
  public abstract changeStatusQuiz(quizId: number);
  public abstract finishQuizz(quizz: QuizzPatch);
}
