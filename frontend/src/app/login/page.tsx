import Link from "next/link";
import { AuthPanel } from "@/components/auth-panel";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthPanel
      title="Entrar"
      description="Acesse sua conta para gerenciar suas reservas."
      footer={<>Primeira vez por aqui? <Link href="/cadastro" className="text-link">Criar conta</Link></>}
    >
      <LoginForm />
    </AuthPanel>
  );
}
