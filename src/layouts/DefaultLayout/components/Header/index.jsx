import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation('FeedHeader');
    const { t: tPostDetail } = useTranslation('PostDetail');

    // Check if we're on a PostDetail page
    const isPostDetailPage = location.pathname.startsWith('/post/');

    const handleBack = () => {
        navigate(-1);
    };

    if (isPostDetailPage) {
        return (
            <div className="flex items-center gap-4 h-full px-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleBack}
                    className="rounded-full"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="font-semibold">{tPostDetail('title', 'Thread')}</span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full">
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