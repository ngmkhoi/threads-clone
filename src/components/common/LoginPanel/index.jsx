import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Instagram} from "lucide-react";
import {useTranslation} from "react-i18next";

const LoginPanel = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('LoginPanel');

  return (
    <div className="bg-gray-50 rounded-2xl border text-center border-gray-50 p-6 shadow-stone-600">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t('title')}
        </h2>
        <p className="text-sm text-gray-600">
            {t('subtitle')}
        </p>
      </div>

      <div className="space-y-3 mb-3">
        <Button
          onClick={() => navigate('/login')}
          className="w-full bg-gray-900hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl cursor-pointer transition-colors"
        >
            <Instagram className="w-5 h-5"/>
            {t('continueWithInstagram')}
        </Button>
      </div>

        <HoverCard>
            <HoverCardTrigger>
                <a className="text-sm text-gray-500 cursor-pointer"
                   onClick={() => navigate('/login')}
                >
                    {t('loginWithUsername')}
                </a>
            </HoverCardTrigger>
        </HoverCard>
        
    </div>
  );
};

export default LoginPanel;

