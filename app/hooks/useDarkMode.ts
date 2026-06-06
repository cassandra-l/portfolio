// app/hooks/useDarkMode.ts
import { useState, useEffect } from "react";

type ThemeString = "light" | "dark";

export function useDarkMode() {
  // Always initialize as light safely for the server build
  const [theme, setTheme] = useState<ThemeString>("light");

  // Read saved preference on mount (Client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeString;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // Optional: respects their Mac/Windows system dark mode preference out of the box
        setTheme("dark");
      }
    }
  }, []);

  // Sync state with <html> element classes and local storage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
