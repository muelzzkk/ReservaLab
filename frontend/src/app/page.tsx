import { Button } from "@/components/ui/button";
import { spaces } from "@/types/reservation";

export default function Home() {
  return (
    <section className="hero grid items-center gap-9 rounded-3xl px-6 py-10 sm:px-12 sm:py-16 lg:grid-cols-[1.45fr_1fr] lg:px-15">
      <div>
        <h1 className="reveal-text max-w-xl text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">Reserve uma sala ou laboratório</h1>
        <p className="reveal-text reveal-text-delayed mt-5 max-w-md text-base leading-relaxed text-slate-200 sm:text-lg">Escolha o espaço, marque a data da sua atividade e acompanhe seus agendamentos em um só lugar.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="arrow-link" href="/reservas">Ver minhas reservas</Button>
        </div>
      </div>
      <aside className="rounded-2xl border border-white/30 bg-white/10 p-5 sm:p-7">
        <h2 className="text-lg font-semibold">Espaços para reservar</h2>
        <ul className="mt-4 grid gap-2.5">
          {Object.entries(spaces).map(([id, name]) => (
            <li key={id} className="flex items-center gap-3 rounded-xl bg-slate-950/30 px-3 py-2.5">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-teal-200" />
              <span className="font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
