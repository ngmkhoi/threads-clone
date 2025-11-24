import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import authService from "@/services/auth/authService.js";
import {setUser} from "@/features/auth/authSlice.js";
import {Spinner} from "@/components/ui/spinner.jsx";
import {Button} from "@/components/ui/button.jsx";

const VerifyEmail = () => {
    const { t } = useTranslation("VerifyEmail")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');

    console.log(token)

    const [ setLoading ] = useState(true);
    const [ status, setStatus ] = useState('verifying');
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage(t('error.invalidToken'));
            setLoading(false);
            toast.error(message);
            return;
        }

        const handleVerifyEmail = async () => {
            try {
                const response = await authService.verifyEmail(token);
                const { user } = response.data;

                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if(!accessToken && !refreshToken) {
                    toast(t('error.pleaseLoginAgain'));
                    navigate('/auth/login');
                    return;
                }

                dispatch(setUser(user));

                setStatus('success')
                setMessage(t('success.message'))
                toast(t('success.title'));
                navigate('/');
            } catch (error) {
                const errorMessage = error.response?.data?.message;

                if (error.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setMessage(t('error.sessionExpired'));
                    toast(t('error.sessionExpired'));
                    navigate('/auth/login');
                    return;
                }

                setStatus('error');
                setMessage(t('error.verifyFailed'));
                toast(errorMessage || t('error.verifyFailed'));
            }
        }

        handleVerifyEmail()
    }, [dispatch, message, navigate, t, token]);

    return (
        <>
            {status === 'verifying' && (
            <div className="flex flex-col items-center">
                <Spinner className="w-12 h-12" />
                <p className="mt-4 text-lg text-foreground">
                    {t('verifying')}
                </p>
            </div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">✓</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t('success.title')}  {/* ← i18n */}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                        {message}  {/* ← Từ state, đã set bằng i18n */}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('success.redirecting')}  {/* ← i18n */}
                    </p>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4 text-red-500">✕</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t('error.title')}  {/* ← i18n */}
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        {message}  {/* ← Từ state, đã set bằng i18n */}
                    </p>
                    <Button
                        onClick={() => navigate('/auth/login')}
                        className="custom-button-style"
                    >
                        {t('error.backToLogin')}  {/* ← i18n */}
                    </Button>
                </div>
            )}
        </>
    )
}

export default VerifyEmail