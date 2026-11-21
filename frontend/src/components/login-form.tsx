"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function showError(message: string) {
    setError(message);
    addToast({ title: message, color: "danger" });
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: form.get("email"),
        password: form.get("password"),
        callbackUrl: "/reservas",
        redirect: false,
      });
      if (result?.ok && !result.error) {
        addToast({ title: "Login realizado.", color: "success" });
        router.replace("/reservas");
        router.refresh();
        return;
      }
      showError(result?.error === "CredentialsSignin"
        ? "E-mail ou senha inválidos."
        : "Não foi possível entrar. Tente novamente.");
    } catch {
      showError("Não foi possível entrar. Tente novamente.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={login} className="flex flex-col gap-5 md:gap-6">
      <Input label="E-mail" labelPlacement="outside-top" name="email" type="email" autoComplete="username" isRequired maxLength={254} />
      <PasswordInput />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" className="md:min-h-12" isDisabled={pending} fullWidth>{pending ? "Entrando…" : "Entrar"}</Button>
    </form>
  );
}
