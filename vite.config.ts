import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo wird unter https://<user>.github.io/Success/ ausgeliefert.
// In Production muss base auf den Repo-Namen zeigen, sonst 404 bei Assets.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/Success/" : "/",
  server: { host: true, port: 5173 },
}));
