export type Session = { userId: string } | null;

export function useAuth() {
  // TODO: integrate with real auth provider
  const session: Session = null;
  const signIn = async (_email: string, _password: string) => {
    // Silence unused param warnings for placeholder implementation
    void _email;
    void _password;
  };
  const signOut = async () => {};

  return { session, signIn, signOut };
}
