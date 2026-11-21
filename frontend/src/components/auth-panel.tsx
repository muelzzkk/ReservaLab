import type { ReactNode } from "react";

export function AuthPanel({ title, description, footer, children }: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="auth-title"
      className="panel mx-auto grid w-full max-w-lg gap-6 p-5 sm:p-8 md:my-6 md:min-h-[26rem] md:max-w-5xl md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-0 md:overflow-hidden md:p-0"
    >
      <div className="flex flex-col justify-center gap-3 md:border-r md:border-[var(--line)] md:bg-[var(--tint)] md:p-10 lg:p-12">
        <h1 id="auth-title" className="page-title lg:text-5xl">{title}</h1>
        <p className="muted max-w-xs leading-relaxed md:text-lg">{description}</p>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-6 md:p-10 lg:p-12">
        {children}
        <p className="muted border-t border-[var(--line)] pt-5 text-sm leading-relaxed">{footer}</p>
      </div>
    </section>
  );
}
