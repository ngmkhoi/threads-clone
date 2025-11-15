import { HashRouter } from 'react-router-dom';
import AppRoute from "@/components/AppRoute/index.jsx";
import SplashScreen from "@/components/common/SplashScreen/index.jsx";
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Sau 200ms → bắt đầu zoom-fade
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 200);

        // Sau 600ms → ẩn hoàn toàn (200ms + 400ms animation)
        const hideTimer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

  return (
    <>
        {isLoading && <SplashScreen isFading={isFading} />}
        <HashRouter>
            <AppRoute />
        </HashRouter>
    </>
  );
}

export default App;

