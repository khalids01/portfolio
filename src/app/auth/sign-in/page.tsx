import "@skycanvasstudio/sso/styles.css";
import { SignIn } from "@skycanvasstudio/sso/react";

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Sign in</h1>
      <SignIn returnTo="/admin" />
    </div>
  );
}
