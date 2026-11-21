"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, themeKey, themeMedia } from "@/lib/theme";
import { Button } from "@/components/ui/button";

const eventName = "reservalab-theme-change";

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const preference = window.matchMedia(themeMedia);
  function systemChanged() {
    if (!document.documentElement.dataset.themeOverride) {
      applyTheme(preference.matches ? "dark" : "light");
      onChange();
    }
  }
  try {
    if (localStorage.getItem(themeKey)) document.documentElement.dataset.themeOverride = "true";
  } catch { /* A preferência ainda pode ser alterada nesta página. */ }
  preference.addEventListener("change", systemChanged);
  window.addEventListener(eventName, onChange);
  return () => {
    preference.removeEventListener("change", systemChanged);
    window.removeEventListener(eventName, onChange);
  };
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light");

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    document.documentElement.dataset.themeOverride = "true";
    try { localStorage.setItem(themeKey, next); } catch { /* O tema já foi aplicado. */ }
    window.dispatchEvent(new Event(eventName));
  }

  return (
    <Button type="button" variant="secondary" onPress={toggle} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>
      <span aria-hidden="true" className="theme-icons inline-grid w-4">
        <span className="theme-sun">☀</span>
        <span className="theme-moon">☾</span>
      </span>
      {theme === "dark" ? "Escuro" : "Claro"}
    </Button>
  );
}
