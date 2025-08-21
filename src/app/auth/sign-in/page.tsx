import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Sign In</h1>
      <SignInForm />
    </div>
  );
}
