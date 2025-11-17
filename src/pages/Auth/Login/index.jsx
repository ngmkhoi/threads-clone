import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import logoImage from '@/assets/JlaY6JCPfe-.png';
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import instagramLogo from "@/assets/instagram.png";

const Login = () => {
    // const navigate = useNavigate();
    const { t } = useTranslation('Login');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    return (
        <div className="min-h-screen flex flex-col items-center bg-background">

            <img src={logoImage} alt="Logo" className="w-full z-10 h-full overflow-hidden mx-auto no-drag"/>

            <h1 className="relative font-semibold z-20 text-xl mx-auto text-foreground -mt-50">{t('title')}</h1>

            <Input
                type={'text'}
                placeholder={t('form.usernamePlaceholder')}
                value={formData.username}
                className="mt-5 custom-input-style input-focus-subtle"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <Input
                type={'password'}
                placeholder={t('form.passwordPlaceholder')}
                value={formData.password}
                className="mt-3 custom-input-style input-focus-subtle"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {/*Submit Button*/}
            <Button className="mt-3 !font-semibold !text-lg custom-button-style">
                {t('form.submitButton')}
            </Button>

            <a className="mt-5 text-muted-foreground text-sm cursor-pointer">
                {t('form.forgotPassword')}
            </a>

            <p className="mt-5 mb-5 text-muted-foreground text-sm" >
                {t('form.Or')}
            </p>

            <Button
                size="xl"
                className="w-md bg-background-dialog hover:bg-background-dialog cursor-pointer !border-border-btn-dialog border-1 rounded-3xl"
            >
                <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="!w-13 !h-13 mr-8"
                />
                <p className="font-bold text-lg text-foreground">{t(`form.optional`)}</p>
            </Button>

            <footer className="mt-auto mb-5 text-center text-sm text-muted-foreground">{t('footer')}</footer>
        </div>
    );
};

export default Login;
