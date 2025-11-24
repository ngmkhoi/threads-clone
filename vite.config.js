import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        // Plugin custom để handle redirect
        {
            name: 'verify-email-redirect',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    // Nếu request là /verify-email với query params
                    if (req.url && req.url.startsWith('/verify-email')) {
                        // Extract query string
                        const url = new URL(req.url, `http://${req.headers.host}`);
                        const token = url.searchParams.get('token');

                        if (token) {
                            // Redirect về hash router URL
                            const redirectUrl = `/threads-clone/#/auth/verify-email?token=${token}`;
                            res.writeHead(302, { Location: redirectUrl });
                            res.end();
                            return;
                        }
                    }
                    next();
                });
            }
        }
    ],
    base: '/threads-clone/',
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
        },
    },
})


