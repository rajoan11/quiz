export abstract class ResultatApplicatifServiceACI {
    public abstract getQuizStats(id: any);
    public abstract getUsers(idQuiz: any);
    public abstract removeUser(idUser: number, idQuiz: any);
}
