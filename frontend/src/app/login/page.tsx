import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <section className="panel mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="page-title">Entrar</h1>
        <p className="muted">Acesse sua conta para gerenciar suas reservas.</p>
      </div>
      <LoginForm />
      <p className="muted text-sm">Primeira vez por aqui? <Link href="/cadastro" className="text-link">Criar conta</Link></p>
    </section>
  );
}
