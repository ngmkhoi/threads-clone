import { Send } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button.jsx"
import { useNavigate } from "react-router-dom"
import { InstagramGradientIcon } from '@/components/common/Icons/InstagramStyledIcon'
import instagramLogo from "@/assets/instagram.png"

export default function ShareButton({ count }) {
    const navigate = useNavigate()
    const { t } = useTranslation(['DialogMessage', 'LoginPanel'])
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
        // TODO: Add share logic here
    }

    return (
        <>
            <button
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1.5"
                onClick={handleClick}
            >
                <Send className="w-5 h-5" />
                {count > 0 && (
                    <span className="text-sm">{count}</span>
                )}
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-lg min-h-[375px] bg-dialog-background !rounded-2xl">
                    <InstagramGradientIcon
                        Icon={Send}
                        className="!w-15 !h-15 mx-auto mt-2 mb-4"
                    />
                    <DialogHeader>
                        <DialogTitle className="text-center text-3xl font-bold">
                            {t('DialogMessage:dialogMessages.Share.title')}
                        </DialogTitle>
                        <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
                            {t('DialogMessage:dialogMessages.Share.description')}
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
        </>
    )
}
