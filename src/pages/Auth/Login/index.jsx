import {useMemo, useState} from 'react';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";
import instagramLogo from "@/assets/instagram.png";
import {toast} from "sonner";
import createLoginSchema from "@/utils/Validate/auth/loginSchema.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import authService from "@/services/auth/authService.js";
import {setUser} from "@/features/auth/authSlice.js";

const Login = () => {
    const { t } = useTranslation('Login');
    const schema = useMemo(() => createLoginSchema(t), [t])
    const {
        register,
        handleSubmit,
        watch} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const { identifier, password } = watch();
    const isFormValid = identifier && password;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await authService.login(data);
            const {access_token, refresh_token} = response;

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);

            const userResponse = await authService.getCurrentUser();
            dispatch(setUser(userResponse))

            navigate('/');
        } catch (error) {
            const errorMessage = error.message || 'Login failed. Please try again.';
            toast.error(errorMessage);

            // Clear tokens nếu có lỗi
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

        } finally {
            setLoading(false);
        }
    }

    const onError = (errors) => {
        const firstError = errors.identifier?.message || errors.password?.message;

        if(firstError){
            toast(firstError);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center w-auto">

            <Input
                type={'text'}
                placeholder={t('form.identifierPlaceholder')}
                {...register('identifier')}
                className="mt-5 custom-input-style input-focus-subtle"
                autoFocus
            />

            <Input
                type={'password'}
                placeholder={t('form.passwordPlaceholder')}
                {...register('password')}
                className="mt-3 custom-input-style input-focus-subtle"
            />

            {/*Submit Button*/}
            <Button
                className={`mt-3 !font-semibold !text-lg custom-button-style ${
                    isFormValid
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

            <a className="mt-5 text-muted-foreground text-sm cursor-pointer">
                {t('form.forgotPassword')}
            </a>

            <p className="mt-5 mb-5 text-muted-foreground text-sm" >
                {t('form.Or')}
            </p>

            <Button
                size="xl"
                className="w-md bg-background-dialog hover:bg-background-dialog cursor-pointer !border-border-btn-dialog border-1 rounded-3xl"
                type="button"
            >
                <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="!w-13 !h-13 mr-8"
                />
                <p className="font-bold text-lg text-foreground">{t(`form.optional`)}</p>
            </Button>
        </form>
    );
};

export default Login;
