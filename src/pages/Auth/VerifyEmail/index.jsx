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
    const [ loading, setLoading ] = useState(true);
    const [isResending, setIsResending] = useState(false);
    const [ status, setStatus ] = useState('verifying');
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage(t('error.invalidToken'));
            setLoading(false);
            return;
        }

        const handleVerifyEmail = async () => {
            try {
                const response = await authService.verifyEmail(token);
                const { user } = response || {};

                if (user) {
                    dispatch(setUser(user));
                }

                setStatus('success');
                setMessage(t('success.message'));
                toast(t('success.title'));
                setTimeout(() => {
                    window.close();
                }, 4000);
            } catch (error) {
                const statusCode = error.response?.status;
                if (statusCode === 400 || statusCode === 404 || statusCode === 422) {
                    const hasAuth = localStorage.getItem('refreshToken');
                    if (hasAuth) {
                        setStatus('not-verified');
                        setMessage(t('notVerified.message'));
                        toast.message?.(t('notVerified.message')) || toast(t('notVerified.message'));
                    } else {
                        setStatus('not-verified-no-auth');
                        setMessage(t('notVerified.needLoginMessage'));
                        toast.message?.(t('notVerified.needLoginMessage')) || toast(t('notVerified.needLoginMessage'));
                    }
                } else {
                    setStatus('error');
                    setMessage(t('error.verifyFailed'));
                    toast.error(error.response?.data?.message || t('error.verifyFailed'));
                }
            } finally {
                setLoading(false);
            }
        };

        handleVerifyEmail();
    }, [dispatch, navigate, t, token]);

    const handleResendEmail = async () => {
        setIsResending(true);
        try {
            await authService.resendVerificationEmail();
            toast.success(t('notVerified.emailSent'));
            setMessage(t('notVerified.checkInbox'));
        } catch (error) {
            const errorMessage = error.response?.data?.message || t('notVerified.resendFailed');
            toast.error(errorMessage);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <>
            {(status === 'verifying' || loading) && (
                <div className="flex flex-col items-center">
                    <Spinner className="w-12 h-12" />
                    <p className="mt-4 text-lg text-foreground">
                        {t('verifying')}
                    </p>
                </div>
            )}

            {status === 'not-verified' && (
                <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">📧</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t('notVerified.title')}
                    </h1>
                    <p className="text-muted-foreground mb-6 text-center">
                        {message}
                    </p>
                    <Button
                        onClick={handleResendEmail}
                        disabled={isResending}
                        className="custom-button-style"
                    >
                        {isResending ? (
                            <>
                                <Spinner className="mr-2" />
                                {t('notVerified.sending')}
                            </>
                        ) : (
                            t('notVerified.resendButton')
                        )}
                    </Button>
                </div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">✓</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t('success.title')}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                        {message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('success.pleaseLogin')}
                    </p>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4 text-red-500">✕</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t('error.title')}  
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        {message}   
                    </p>
                    <Button
                        onClick={handleResendEmail}
                        disabled={isResending}
                        className="custom-button-style"
                    >
                        {isResending ? (
                            <>
                                <Spinner className="mr-2" />
                                {t('notVerified.sending')}
                            </>
                        ) : (
                            t('notVerified.resendButton')
                        )}
                    </Button>
                </div>
            )}
        </>
    )
}

export default VerifyEmail