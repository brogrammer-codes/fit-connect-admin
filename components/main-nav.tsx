"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MainNav: React.FC<{ onClickCallback?: () => void }> = ({ onClickCallback }) => {
  const pathname = usePathname();
  const routes = [
    {
      href: `/dashboard`,
      label: "Dashboard",
      active: pathname === `/dashboard`,
    },
    {
      href: `/clients`,
      label: "Clients",
      active: pathname === `/clients`,
    },
    {
      href: `/plans`,
      label: "Plans",
      active: pathname === `/plans`,
    },
    {
      href: `/activities`,
      label: "Activities",
      active: pathname === `/activities`,
    },
  ];
  return (
    <nav className={cn("flex items-center gap-4 md:flex-row flex-col")}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-semibold transition-colors hover:text-primary",
            route.active
              ? "text-neutral-800"
              : "text-stone-300 text-muted-foreground"
          )}
          onClick={() => onClickCallback && onClickCallback()}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
