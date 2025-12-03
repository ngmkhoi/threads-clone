import { HashRouter } from 'react-router-dom';
import AppRoute from "@/components/AppRoute/index.jsx";
import SplashScreen from "@/components/Common/SplashScreen/index.jsx";
import {useEffect, useState} from "react";
import {Toaster} from "@/components/ui/sonner.jsx";
import AuthProvider from "@/components/AuthProvider/index.js";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Sau 200ms → bắt đầu zoom-fade
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 400);

        // Sau 600ms → ẩn hoàn toàn (200ms + 400ms animation)
        const hideTimer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

  return (
    <>
        {isLoading && <SplashScreen isFading={isFading} />}
        <HashRouter>
            <AuthProvider>
                <AppRoute />
                <Toaster position="bottom-center" closeButton={false}/>
            </AuthProvider>
        </HashRouter>
    </>
  );
}

export default App;

