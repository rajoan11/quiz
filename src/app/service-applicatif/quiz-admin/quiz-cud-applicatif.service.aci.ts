import { QuizDto } from '../../donnee/quiz';
export abstract class QuizCudApplicatifServiceACI {
  public abstract createQuiz(quiz: QuizDto);
  public abstract updateQuiz(quiz: QuizDto);
  public abstract deleteQuiz(quizId: number);
}
