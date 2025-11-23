import { object, string } from "yup";

const createLoginSchema = (t) => object().shape({
    identifier: string()
        .required(t('validation.identifierRequired'))
        .min(3, t('validation.identifierMin')),

    password: string()
        .required(t('validation.passwordRequired'))
        .min(8, t('validation.passwordMin'))
});

export default createLoginSchema;