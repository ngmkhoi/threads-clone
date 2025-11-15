import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";

const LoginPanel = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('LoginPanel');

  return (
    <div  className="bg-loginpanel-background rounded-2xl border w-full border-border text-center p-4 shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground mb-2">
            {t('title')}
        </h2>
        <p   className="text-sm text-muted-foreground">
            {t('subtitle')}
        </p>
      </div>

      <div className="space-y-3 mb-3">
        <Button
          onClick={() => navigate('/login')}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
        >
           <FontAwesomeIcon icon={faInstagram} className="text-xl mr-2" />
            {t('continueWithInstagram')}
        </Button>
      </div>

        <a className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
           onClick={() => navigate('/login')}
        >
            {t('loginWithUsername')}
        </a>
        
    </div>
  );
};

export default LoginPanel;

