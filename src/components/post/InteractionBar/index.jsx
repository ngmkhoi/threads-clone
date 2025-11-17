import {Heart, MessageCircle, Repeat, Send} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog"
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import { InstagramGradientIcon } from '@/components/common/Icons/InstagramStyledIcon';
import instagramLogo from "@/assets/instagram.png";


export default function InteractionBar({likes, comments, repost ,shares}) {
    const interactions = [
        { icon: Heart, count: likes, label: 'Like' },
        { icon: MessageCircle, count: comments, label: 'Comment' },
        { icon: Repeat, count: repost, label: 'Repost' },
        { icon: Send, count: shares, label: 'Share'}
    ]

    const interactionIcons = {
        Like: Heart,
        Comment: MessageCircle,
        Repost: Repeat,
        Share: Send
    }

    const navigate = useNavigate();
    const { t } = useTranslation(['DialogMessage', 'LoginPanel'])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedInteraction, setSelectedInteraction] = useState(null)
    const SelectedIcon = selectedInteraction ? interactionIcons[selectedInteraction] : null

    return (
        <Dialog open={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setSelectedInteraction(null)
                }}
        >
            <div className="flex items-center gap-1 mt-3">
                {interactions.map((interaction) => {
                    const Icon = interaction.icon

                    return (
                        <button key={interaction.label}
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1.5"
                                onClick={() => {
                                    setIsOpen(true)
                                    setSelectedInteraction(interaction.label)
                                }}
                        >
                            <Icon className="w-5 h-5" />
                            {interaction.count > 0 && (
                                <span className="text-sm">{interaction.count}</span>
                            )}
                        </button>
                    )
                })}
            </div>

            <DialogContent className="sm:max-w-lg min-h-[375px] bg-dialog-background !rounded-2xl">
                {/*icon*/}
                {SelectedIcon && (
                    <InstagramGradientIcon
                        Icon={SelectedIcon}
                        className="!w-15 !h-15 mx-auto mt-2 mb-4"
                    />
                )}
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl font-bold">
                        {selectedInteraction && t(`DialogMessage:dialogMessages.${selectedInteraction}.title`)}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        {selectedInteraction && t(`DialogMessage:dialogMessages.${selectedInteraction}.description`)}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-3">
                    <Button
                        size="xl"
                        onClick={() => navigate('/login')}
                        className="w-full bg-background-dialog hover:bg-background-dialog cursor-pointer border-1 !border-border-btn-dialog text-loginpanel-foreground rounded-3xl"
                    >
                        <img
                            src={instagramLogo}
                            alt="Instagram"
                            className="!w-13 !h-13 mr-2"
                        />
                        <p>{t(`LoginPanel:continueWithInstagram`)}</p>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
