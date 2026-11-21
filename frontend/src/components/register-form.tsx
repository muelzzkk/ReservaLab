"use client";

import { register } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useActionToast } from "@/components/use-action-toast";

export function RegisterForm() {
  const [error, action, pending] = useActionToast(register, "/login");
  return (
    <form action={action} className="space-y-4">
      <Input label="E-mail" name="email" type="email" autoComplete="email" isRequired maxLength={254} />
      <PasswordInput registration />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" isDisabled={pending} fullWidth>{pending ? "Criando conta…" : "Criar conta"}</Button>
    </form>
  );
}
