import { object, string } from "yup";

const createForgotPasswordSchema = (t) => object().shape({
    email: string()
        .required(t('validation.emailRequired'))
        .matches(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, t('validation.emailInvalid')),
});

export default createForgotPasswordSchema;
