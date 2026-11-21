"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AuthNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" && (
        <Button variant="secondary" href="/login" className="px-2.5 sm:px-4">Entrar</Button>
      )}
      {pathname !== "/cadastro" && (
        <Button href="/cadastro" className="px-2.5 sm:px-4">Criar conta</Button>
      )}
    </>
  );
}
