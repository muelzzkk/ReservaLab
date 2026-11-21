"use client";

import { Button as HeroButton, Link as HeroLink, type ButtonProps } from "@heroui/react";
import Link from "next/link";

type Props = Omit<ButtonProps, "as" | "variant"> & {
  href?: string;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ href, variant = "primary", className = "", children, ...props }: Props) {
  const classes = `app-button button-${variant} min-h-11 border px-4 text-sm font-semibold ${className}`;
  if (href) {
    return (
      <HeroLink as={Link} href={href} className={`${classes} rounded-xl justify-center gap-2`}>
        {children}
      </HeroLink>
    );
  }

  return (
    <HeroButton radius="lg" className={classes} {...props}>{children}</HeroButton>
  );
}
