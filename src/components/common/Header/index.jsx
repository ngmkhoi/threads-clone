import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Header = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('FeedHeader');

    return (
        <div className="flex justify-center items-center h-7">
            <a
                onClick={() => navigate('/')}
                className="font-semibold bg-transparent border-none p-0 cursor-pointer"
            >
                {t('title')}
            </a>
        </div>
    );
};

export default Header;