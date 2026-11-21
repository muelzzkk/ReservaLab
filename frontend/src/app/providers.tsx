"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider locale="pt-BR" navigate={router.push} disableAnimation disableRipple>
      <ToastProvider placement="bottom-right" disableAnimation />
      {children}
    </HeroUIProvider>
  );
}
