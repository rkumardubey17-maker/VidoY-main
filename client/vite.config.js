import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "");
  const proxyTarget =
    env.VITE_API_PROXY_TARGET || `http://localhost:${env.PORT || "8000"}`;

  return {
    envDir: "..",
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
