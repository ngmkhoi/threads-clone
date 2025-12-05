import { object, string } from "yup";

const createReplySchema = (t) => object().shape({
    content: string()
        .required(t('PostCard:validation.contentRequired'))
        .min(1, t('PostCard:validation.contentMin'))
        .max(500, t('PostCard:validation.contentMax'))
});

export default createReplySchema;