export const themeKey = "reservalab-theme";
export const themeMedia = "(prefers-color-scheme: dark)";

export function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export const initializeTheme = `{
  let saved;
  try { saved = localStorage.getItem("${themeKey}"); } catch {}
  const dark = saved === "dark" || (saved !== "light" && matchMedia("${themeMedia}").matches);
  const root = document.documentElement;
  root.dataset.theme = dark ? "dark" : "light";
  root.classList.add(root.dataset.theme);
}`;
