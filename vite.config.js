import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// If deploying to https://USERNAME.github.io/REPO_NAME/ set base to '/REPO_NAME/'.
// If deploying to https://USERNAME.github.io/ (a user site) leave base as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
