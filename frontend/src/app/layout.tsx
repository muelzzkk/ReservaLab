import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { initializeTheme } from "@/lib/theme";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reserva Lab",
  description: "Gerencie suas reservas de salas e laboratórios.",
  icons: { icon: { url: "/reserva-lab.svg", type: "image/svg+xml", sizes: "any" } },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initializeTheme }} />
      </head>
      <body>
        <Providers>
          <header className="site-header">
            <nav aria-label="Principal" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:gap-5 sm:px-8 sm:py-4">
              <Link href="/" className="col-start-1 row-start-1 flex w-fit min-w-0 items-center gap-2.5 text-lg font-bold tracking-tight sm:text-xl">
                <Image src="/reserva-lab.svg" alt="" width={36} height={36} className="shrink-0" />
                Reserva Lab
              </Link>
              <Link href="/reservas" className="text-link col-span-2 row-start-2 inline-flex min-h-11 w-fit items-center text-sm min-[460px]:col-span-1 sm:col-start-2 sm:row-start-1">Minhas reservas</Link>
              <div className="col-start-2 row-start-1 justify-self-end sm:col-start-3">
                {user ? (
                  <span className="lab-tag rounded-full px-2.5 py-1 text-xs">Logado</span>
                ) : (
                  <span className="muted rounded-full border border-[var(--line)] px-2.5 py-1 text-xs">Não logado</span>
                )}
              </div>
              <div className={`col-span-2 row-start-3 items-center justify-end gap-2 min-[460px]:col-span-1 min-[460px]:col-start-2 min-[460px]:row-start-2 sm:col-start-4 sm:row-start-1 ${user ? "flex" : "grid grid-cols-3 min-[460px]:flex"}`}>
                <ThemeSwitch />
                {user ? <LogoutButton /> : (
                  <>
                    <Button variant="secondary" href="/login" className="px-2.5 sm:px-4">Entrar</Button>
                    <Button href="/cadastro" className="px-2.5 sm:px-4">Criar conta</Button>
                  </>
                )}
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-12">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
