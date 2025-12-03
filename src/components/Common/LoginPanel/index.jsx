import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button.jsx";
import {useTranslation} from "react-i18next";
import InstagramIcon from "@/components/Common/Icons/InstagramIcon.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.jsx";

const LoginPanel = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('LoginPanel');

  return (
    <Card  className="bg-loginpanel-background rounded-4xl border w-full border-border text-center shadow py-5 px-5">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold gap-1 text-foreground mb-2">
            {t('title')}
        </CardTitle>
        <CardDescription className="text-[14px] gap-1 text-loginpanel-foreground">
            {t('subtitle')}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 space-y-4 mb-5">
        <Button
            size="lg2"
            onClick={() => navigate('/auth/login')}
            className="w-full bg-background hover:bg-background cursor-pointer text-loginpanel-foreground rounded-3xl"
        >
            <InstagramIcon className="!w-8 !h-8 mr-1" />
           <p>{t('continueWithInstagram')}</p>
        </Button>
      </CardContent>

      <CardFooter className="p-0 flex justify-center">
        <a className="text-[14px] text-loginpanel-foreground cursor-pointer gap-1"
           onClick={() => navigate('/auth/login')}
        >
            {t('loginWithUsername')}
        </a>
      </CardFooter>
        
    </Card>
  );
};

export default LoginPanel;

