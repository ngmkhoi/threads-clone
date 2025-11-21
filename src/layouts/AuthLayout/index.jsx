import {useTranslation} from "react-i18next";
import logoImage from "@/assets/JlaY6JCPfe-.png";
import { Outlet, useLocation } from 'react-router-dom';
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";

const AuthLayout = () => {
    const {t} = useTranslation();
    const location = useLocation();
    let pageTitle = '';

    if(location.pathname === '/auth/login') {
        pageTitle = t('Login:title')
    }else if(location.pathname === '/auth/register') {
        pageTitle = t('Register:title')
    }else if(location.pathname === '/auth/forgot-password') {
        pageTitle = t('ForgotPassword:title')
    }else if(location.pathname === '/auth/verify-email') {
        pageTitle = t('VerifyEmail:title')
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-auth-background"> {/* Thêm pt-12 để có khoảng trống ở trên */}
            {/* --- BẮT ĐẦU KHỐI ĐƯỢC THAY ĐỔI --- */}
                 <div className="relative w-full">
                     <AspectRatio ratio={16/4}>
                         <img
                             src={logoImage}
                             alt="Logo"
                             className="w-full no-drag object-cover"
                         />
                     </AspectRatio>
                     {pageTitle &&
                         <h1
                                 className="absolute bottom-30 left-1/2 -translate-x-1/2 translate-y-1/2 font-semibold text-xl text-foreground w-auto justify-center"
                             >
                                {pageTitle}
                            </h1>
                         }
                </div>

            <div className="w-full z-20 flex flex-col items-center -mt-20 px-4">
                <Outlet/>
            </div>

                 <footer className="mt-auto mb-5 text-center text-sm text-muted-foreground">{t('Login:footer')}</footer>
             </div>
    )
}

export default AuthLayout