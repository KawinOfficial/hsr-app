import { RegisterForm } from "@/features/auths/components/register-form";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <RegisterForm />
      </div>
    </div>
  );
}
