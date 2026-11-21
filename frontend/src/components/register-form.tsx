"use client";

import { register } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useActionToast } from "@/components/use-action-toast";

export function RegisterForm() {
  const [error, action, pending] = useActionToast(register, "/login");
  return (
    <form action={action} className="flex flex-col gap-5 md:gap-6">
      <Input label="E-mail" labelPlacement="outside-top" name="email" type="email" autoComplete="email" isRequired maxLength={254} />
      <PasswordInput registration />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" className="md:min-h-12" isDisabled={pending} fullWidth>{pending ? "Criando conta…" : "Criar conta"}</Button>
    </form>
  );
}
