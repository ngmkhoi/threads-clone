import { useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import createRegisterSchema from "@/utils/Validate/auth/registerSchema.js";
import { useNavigate } from "react-router-dom";

import useDebounce from "@/hooks/useDebounce.js";
import { useEffect } from "react";

import instagramLogo from "@/assets/instagram.png";

const Register = () => {
    const { t } = useTranslation('Register');
    const schema = useMemo(() => createRegisterSchema(t), [t])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        delayError: 500, // Debounce validation error display
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    })

    const { username, email, password, password_confirmation } = watch();
    const isFormValid = username && email && password && password_confirmation;

    // Example of using useDebounce for future async validation (e.g. checking username availability)
    const debouncedUsername = useDebounce(username, 500);

    useEffect(() => {
        if (debouncedUsername) {
            // Here you can trigger async validation
            // console.log('Checking availability for:', debouncedUsername);
        }
    }, [debouncedUsername]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Logic đăng ký sẽ được implement sau
            console.log('Register data:', data);
            toast.success('Register logic not implemented yet');
        } catch (error) {
            toast.error('Register failed');
        } finally {
            setLoading(false);
        }
    }

    const onError = (errors) => {
        const firstError = errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.password_confirmation?.message;

        if (firstError) {
            toast.error(firstError);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center w-auto">
            <Input
                type={'text'}
                placeholder={t('form.usernamePlaceholder')}
                {...register('username')}
                className="mt-5 custom-input-style input-focus-subtle"
                autoFocus
            />

            <Input
                type={'email'}
                placeholder={t('form.emailPlaceholder')}
                {...register('email')}
                className="mt-3 custom-input-style input-focus-subtle"
            />

            <Input
                type={'password'}
                placeholder={t('form.passwordPlaceholder')}
                {...register('password')}
                className="mt-3 custom-input-style input-focus-subtle"
            />

            <Input
                type={'password'}
                placeholder={t('form.confirmPasswordPlaceholder')}
                {...register('password_confirmation')}
                className="mt-3 custom-input-style input-focus-subtle"
            />

            {/*Submit Button*/}
            <Button
                className={`mt-3 !font-semibold !text-lg custom-button-style ${isFormValid
                    ? ' !text-button-foreground-active cursor-pointer'
                    : ' cursor-not-allowed'
                    }`}
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Spinner className="mr-2" />
                        {t('form.loading')}
                    </>
                ) : (
                    t('form.submitButton')
                )}
            </Button>

            <p className="mt-5 mb-5 text-muted-foreground text-sm" >
                {t('form.Or') || "or"}
            </p>

            <Button
                size="xl"
                className="w-md bg-background-dialog hover:bg-background-dialog cursor-pointer !border-border-btn-dialog border-1 rounded-3xl"
                type="button"
                onClick={() => navigate('/auth/login')}
            >
                <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="!w-13 !h-13 mr-3"
                />
                <p className="font-bold text-lg text-foreground">{t('form.login')}</p>
            </Button>
        </form>
    );
};

export default Register;
