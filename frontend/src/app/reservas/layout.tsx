import { requireUser } from "@/lib/auth";

export default async function ReservationsLayout({ children }: LayoutProps<"/reservas">) {
  await requireUser();
  return children;
}
