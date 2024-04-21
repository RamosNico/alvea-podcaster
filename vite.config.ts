import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Disabled TanStackRouterVite plugin to avoid vite breaking the routes
  // plugins: [react(), TanStackRouterVite()],
});
