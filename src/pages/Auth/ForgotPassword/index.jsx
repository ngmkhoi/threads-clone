import { useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import createForgotPasswordSchema from "@/utils/Validate/auth/forgotPasswordSchema.js";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth/authService.js";
import instagramLogo from "@/assets/instagram.png";

const ForgotPassword = () => {
    const { t } = useTranslation('ForgotPassword');
    const schema = useMemo(() => createForgotPasswordSchema(t), [t])
    const {
        register,
        handleSubmit,
        watch } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
                email: ''
            }
        })

    const { email } = watch();
    const isFormValid = email;

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await authService.forgotPassword(data.email);
            toast(t('validation.success'));
        } catch (error) {
            const errorMessage = error.response?.status === 422
                ? t('validation.emailNotFound')
                : (error.message || t('validation.failed'));
            toast(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const onError = (errors) => {
        const firstError = errors.email?.message;

        if (firstError) {
            toast(firstError);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center w-auto">
            <Input
                type={'email'}
                placeholder={t('form.emailPlaceholder')}
                {...register('email')}
                className="mt-5 custom-input-style input-focus-subtle"
                autoFocus
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

            <a className="mt-5 text-muted-foreground text-sm cursor-pointer" onClick={() => navigate('/auth/login')}>
                {t('form.backToLogin')}
            </a>

            <p className="mt-5 mb-5 text-muted-foreground text-sm" >
                {t('form.Or')}
            </p>

            <Button
                size="xl"
                className="w-md bg-background-dialog hover:bg-background-dialog cursor-pointer !border-border-btn-dialog border-1 rounded-3xl"
                type="button"
                onClick={() => navigate('/auth/register')}
            >
                <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="!w-13 !h-13 mr-3"
                />
                <p className="font-bold text-lg text-foreground">{t('form.createAccount') || "Create new account"}</p>
            </Button>
        </form>
    );
};

export default ForgotPassword;
