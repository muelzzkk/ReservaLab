"use client";

import { Card, CardBody, Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-5 sm:gap-6">
      <p className="muted text-sm">Carregando reservas…</p>
      <div aria-hidden="true" className="grid gap-5 sm:grid-cols-2">
        {[0, 1].map((card) => (
          <Card key={card} className="reservation-card" shadow="none">
            <CardBody className="gap-4 p-5 sm:p-6">
              <Skeleton className="skeleton-block h-6 w-28 rounded-full" />
              <Skeleton className="skeleton-block h-7 w-3/4 rounded-lg" />
              <Skeleton className="skeleton-block h-5 w-1/2 rounded-lg" />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
