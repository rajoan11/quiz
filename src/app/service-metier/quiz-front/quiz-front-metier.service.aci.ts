export abstract class QuizFrontMetierServiceACI {
    public abstract getQuiz(id: any);
    public abstract getQuizCorrection(id: any);
    public abstract saveQuizResponse(quiz: any);
}
