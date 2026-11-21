"use client";

import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import type { ActionResult } from "@/types/reservation";

export function useActionToast(action: (form: FormData) => Promise<ActionResult>, destination: string) {
  const router = useRouter();

  return useActionState(async (_: string | null, form: FormData) => {
    const result = await action(form).catch(() => ({
      error: "Não foi possível concluir a solicitação. Tente novamente.",
    }));
    if (!result) return null;
    if ("error" in result) {
      addToast({ title: result.error, color: "danger" });
      return result.error;
    }

    addToast({ title: result.success, color: "success" });
    router.replace(destination);
    return null;
  }, null);
}
