"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    try {
      const result = await signOut({ callbackUrl: "/", redirect: false });
      if (result?.url !== new URL("/", window.location.origin).href) throw new Error("Falha no logout");
      addToast({ title: "Você saiu da sua conta.", color: "success" });
      router.replace("/");
      router.refresh();
    } catch {
      addToast({ title: "Não foi possível sair. Tente novamente.", color: "danger" });
      setPending(false);
    }
  }

  return <Button variant="secondary" onPress={logout} isDisabled={pending}>{pending ? "Saindo…" : "Sair"}</Button>;
}
