import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expõe pra rede local
    port: 5173, // opcional, mas você pode definir
    strictPort: true, // não troca de porta se estiver ocupada
  },
});
