// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///D:/bot-flow-ai/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.37_lightningcss@1.32.0/node_modules/vite/dist/node/index.js";
import EnvironmentPlugin from "file:///D:/bot-flow-ai/node_modules/.pnpm/vite-plugin-environment@1.1_033606b2c60ede3fcfaa69c7de7003fd/node_modules/vite-plugin-environment/dist/index.js";
import tsconfigPaths from "file:///D:/bot-flow-ai/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_t_1095d1eacd0e85ee0558a8b8eeca7169/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tailwindcss from "file:///D:/bot-flow-ai/node_modules/.pnpm/@tailwindcss+vite@4.2.1_vit_8794f7dd9a2b318c06eb12ebe01e8948/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///D:/bot-flow-ai/node_modules/.pnpm/@vitejs+plugin-react@4.7.0__a36cc7a05359c86f13ae4a88845475e0/node_modules/@vitejs/plugin-react/dist/index.js";
var __vite_injected_original_dirname = "D:\\bot-flow-ai";
delete process.env["CommonProgramFiles(x86)"];
delete process.env["ProgramFiles(x86)"];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_ENDPOINT || "http://localhost:5000";
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      EnvironmentPlugin("all"),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, ""),
          secure: false
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxib3QtZmxvdy1haVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYm90LWZsb3ctYWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2JvdC1mbG93LWFpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgRW52aXJvbm1lbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuXHJcbi8vIENsZWFyIHNwZWNpZmljIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG5kZWxldGUgcHJvY2Vzcy5lbnZbJ0NvbW1vblByb2dyYW1GaWxlcyh4ODYpJ107XHJcbmRlbGV0ZSBwcm9jZXNzLmVudlsnUHJvZ3JhbUZpbGVzKHg4NiknXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZW52LlZJVEVfQVBJX0VORFBPSU5UIHx8ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICByZWFjdCgpLFxyXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgICAgICAgICAgIEVudmlyb25tZW50UGx1Z2luKCdhbGwnKSxcclxuICAgICAgICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXJ2ZXI6IHtcclxuICAgICAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdPLE9BQU8sVUFBVTtBQUNqUCxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLHVCQUF1QjtBQUM5QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFdBQVc7QUFMbEIsSUFBTSxtQ0FBbUM7QUFRekMsT0FBTyxRQUFRLElBQUkseUJBQXlCO0FBQzVDLE9BQU8sUUFBUSxJQUFJLG1CQUFtQjtBQUV0QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN0QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxTQUFTLElBQUkscUJBQXFCO0FBRXhDLFNBQU87QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGtCQUFrQixLQUFLO0FBQUEsTUFDdkIsWUFBWTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDeEM7QUFBQSxJQUNKO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDSCxRQUFRO0FBQUEsVUFDSjtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsVUFFNUMsUUFBUTtBQUFBLFFBQ1o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
