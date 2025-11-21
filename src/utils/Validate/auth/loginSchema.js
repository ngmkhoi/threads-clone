import {object, string} from "yup";

const createLoginSchema = (t) => object().shape({
    identifier: string()
        .required(t('validation.identifierRequired')),

    password: string()
        .required(t('validation.passwordRequired'))
});

export default createLoginSchema;