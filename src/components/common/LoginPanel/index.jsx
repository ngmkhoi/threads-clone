import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";
import {useTranslation} from "react-i18next";
import InstagramIcon from "@/components/common/Icons/InstagramIcon.tsx";
const LoginPanel = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('LoginPanel');

  return (
    <div  className="bg-loginpanel-background rounded-4xl border w-full border-border text-center shadow py-5 px-5">
      <div className="mb-6">
        <h2 className="text-xl font-bold gap-1 text-foreground mb-2">
            {t('title')}
        </h2>
        <p   className="text-[14px] gap-1 text-loginpanel-foreground">
            {t('subtitle')}
        </p>
      </div>

      <div className="space-y-4 mb-5">
        <Button
            size="xl"
            onClick={() => navigate('/login')}
            className="w-full bg-background hover:bg-background cursor-pointer text-loginpanel-foreground rounded-3xl"
        >
            <InstagramIcon className="!w-8 !h-8 mr-2" />
           <p>{t('continueWithInstagram')}</p>
        </Button>
      </div>

        <a className="text-[14px] text-loginpanel-foreground cursor-pointer gap-1"
           onClick={() => navigate('/login')}
        >
            {t('loginWithUsername')}
        </a>
        
    </div>
  );
};

export default LoginPanel;

