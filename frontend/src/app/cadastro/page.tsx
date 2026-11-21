import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <section className="panel mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="page-title">Criar conta</h1>
        <p className="muted">Cadastre seu e-mail para reservar salas e laboratórios.</p>
      </div>
      <RegisterForm />
      <p className="muted text-sm">Já tem uma conta? <Link href="/login" className="text-link">Entrar</Link></p>
    </section>
  );
}
