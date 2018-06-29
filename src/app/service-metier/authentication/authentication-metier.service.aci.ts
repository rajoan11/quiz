export abstract class AuthenticationMetierServiceACI {
  public abstract login(token: string);
  public abstract loginFront(user: any);
}
