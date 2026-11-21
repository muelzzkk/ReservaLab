import Link from "next/link";
import { AuthPanel } from "@/components/auth-panel";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <AuthPanel
      title="Criar conta"
      description="Cadastre seu e-mail para reservar salas e laboratórios."
      footer={<>Já tem uma conta? <Link href="/login" className="text-link">Entrar</Link></>}
    >
      <RegisterForm />
    </AuthPanel>
  );
}
