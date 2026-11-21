"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function PasswordInput({ registration = false }: { registration?: boolean }) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label="Senha"
      name="password"
      type={visible ? "text" : "password"}
      autoComplete={registration ? "new-password" : "current-password"}
      minLength={registration ? 8 : undefined}
      maxLength={72}
      description={registration ? "Use pelo menos 8 caracteres." : undefined}
      isRequired
      endContent={
        <Button
          type="button"
          isIconOnly
          size="sm"
          variant="light"
          className="text-inherit"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          onPress={() => setVisible((value) => !value)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.5" />
            {visible && <path d="m4 4 16 16" />}
          </svg>
        </Button>
      }
    />
  );
}
