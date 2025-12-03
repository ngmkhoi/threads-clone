import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import createResetPasswordSchema from "@/utils/Validate/auth/resetPasswordSchema.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "@/services/auth/authService.js";

const ResetPassword = () => {
    const { t } = useTranslation('ResetPassword');
    const schema = useMemo(() => createResetPasswordSchema(t), [t])
    const storedEmail = localStorage.getItem('resetPasswordEmail');
    const {
        register,
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: storedEmail || '',
            password: '',
            password_confirmation: ''
        }
    })

    const { password, password_confirmation } = watch();

    const isFormValid = password && password_confirmation;

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setValidating(false);
                setIsValidToken(false);
                toast.error(t('validation.invalidToken'));
                return;
            }
            try {
                const response = await authService.validateResetToken(token);
                if (response.valid) {
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                    toast.error(t('validation.invalidToken'));
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || t('validation.failed');
                toast.error(errorMessage);
            } finally {
                setValidating(false);
            }
        };

        validateToken();
    }, [token, t]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await authService.resetPassword(token, data.email, data.password, data.password_confirmation);
            localStorage.removeItem('resetPasswordEmail');
            toast.success(t('validation.success'));
            navigate('/auth/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || t('validation.failed');
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const onError = (errors) => {
        const firstError = errors.email?.message || errors.password?.message || errors.password_confirmation?.message;

        if (firstError) {
            toast(firstError);
        }
    }

    if (validating) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Spinner className="w-12 h-12" />
                <p className="mt-4 text-lg text-foreground">{t('form.validating')}</p>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg text-red-500">{t('validation.invalidTokenMessage')}</p>
                <Button className="mt-4" onClick={() => navigate('/auth/forgot-password')}>
                    {t('form.backToForgotPassword')}
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center w-auto">
            {!storedEmail && (
                <Input
                    type={'email'}
                    placeholder={t('form.emailPlaceholder')}
                    {...register('email')}
                    className="mt-5 custom-input-style input-focus-subtle"
                    autoFocus
                />
            )}

            <Input
                type={'password'}
                placeholder={t('form.passwordPlaceholder')}
                {...register('password')}
                className="mt-3 custom-input-style input-focus-subtle"
            />

            <Input
                type={'password'}
                placeholder={t('form.passwordConfirmationPlaceholder')}
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

            <a className="mt-5 text-muted-foreground text-sm cursor-pointer" onClick={() => navigate('/auth/login')}>
                {t('form.backToLogin')}
            </a>
        </form>
    );
};

export default ResetPassword;
