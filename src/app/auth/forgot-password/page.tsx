import { SignIn } from "@skycanvasstudio/sso/react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <SignIn returnTo="/" />
    </div>
  );
}
