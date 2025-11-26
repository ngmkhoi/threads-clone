import { object, string, ref } from "yup";

const createRegisterSchema = (t) => object().shape({
    username: string()
        .required(t('validation.usernameRequired'))
        .min(3, t('validation.usernameMin'))
        .matches(/^[a-zA-Z0-9_-]+$/, t('validation.usernameInvalid')),

    email: string()
        .required(t('validation.emailRequired'))
        .matches(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, t('validation.emailInvalid')),

    password: string()
        .required(t('validation.passwordRequired'))
        .min(8, t('validation.passwordMin')),

    password_confirmation: string()
        .required(t('validation.confirmPasswordRequired'))
        .oneOf([ref('password'), null], t('validation.confirmPasswordMatch'))
});

export default createRegisterSchema;
