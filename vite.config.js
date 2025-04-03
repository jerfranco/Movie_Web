import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, dirname } from "path"
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [svelte()],
  root: "src",
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/user/login.html"),
        signup: resolve(__dirname, "src/user/signup.html"),
        dashboard: resolve(__dirname, "src/user/dashboard.html")
      }
    }
  }
})