import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react({
        babel: {
            plugins: [['babel-plugin-react-compiler', { runtime: 'automatic' }]]
        }
    })],
    base: command === 'serve' ? '/' : '/threads-clone/',
    resolve: {
        alias: {
            //eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
        },
    }
}));
