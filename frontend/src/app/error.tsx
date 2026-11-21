"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="panel space-y-4">
      <h1 className="text-xl font-semibold">Não foi possível concluir a operação</h1>
      <Button onPress={reset}>Tentar novamente</Button>
    </section>
  );
}
