import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import {InstagramGradientIcon} from "@/components/Common/Icons/InstagramStyledIcon.jsx";
import {Button} from "@/components/ui/button.jsx";
import instagramLogo from "@/assets/instagram.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function LoginDialog({open, onOpenChange, icon, title, description}) {
   const navigate = useNavigate();
   const { t } = useTranslation(['DialogMessage', 'LoginPanel'])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg min-h-[375px] bg-dialog-background !rounded-2xl">
                <InstagramGradientIcon
                    Icon={icon}
                    className="!w-15 !h-15 mx-auto mt-2 mb-4"
                />
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl font-bold">
                        {t(title)}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        {t(description)}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-3">
                    <Button
                        size="xl"
                        onClick={() => navigate('/auth/login')}
                        className="w-full bg-background-dialog hover:bg-background-dialog cursor-pointer border-1 !border-border-btn-dialog text-loginpanel-foreground rounded-3xl"
                    >
                        <img
                            src={instagramLogo}
                            alt="Instagram"
                            className="!w-13 !h-13 mr-2"
                        />
                        <p>{t('LoginPanel:continueWithInstagram')}</p>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;