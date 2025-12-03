import * as yup from 'yup';

const createResetPasswordSchema = (t) => {
    return yup.object().shape({
        email: yup.string()
            .required(t('validation.emailRequired'))
            .email(t('validation.emailInvalid')),
        password: yup.string()
            .required(t('validation.passwordRequired'))
            .min(6, t('validation.passwordMin')),
        password_confirmation: yup.string()
            .required(t('validation.passwordConfirmationRequired'))
            .oneOf([yup.ref('password'), null], t('validation.passwordMatch'))
    });
};

export default createResetPasswordSchema;
