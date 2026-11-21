"use client";

import { Input as HeroInput, type InputProps } from "@heroui/react";

export function Input(props: InputProps) {
  return (
    <HeroInput
      labelPlacement="outside"
      radius="lg"
      variant="bordered"
      classNames={{ label: "app-field-label", inputWrapper: "app-field-wrapper", input: "app-field-input" }}
      {...props}
    />
  );
}
