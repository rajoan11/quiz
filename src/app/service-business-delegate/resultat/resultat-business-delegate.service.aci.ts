export abstract class ResultatBusinessDelegateServiceACI {
    public abstract getQuizStats(id: any);
    public abstract getUsers(idQuiz: any);
    public abstract removeUser(idUser: number, idQuiz: any);
}
