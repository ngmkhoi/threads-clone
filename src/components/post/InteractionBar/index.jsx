import {Heart, Instagram, MessageCircle, Repeat, Send} from 'lucide-react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle, DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog"
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";

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

            <DialogContent className="sm:max-w-md">
                {/*icon*/}
                <div className="flex justify-center mb-2">
                    <div className="rounded-full p-4">
                        {SelectedIcon && <SelectedIcon className="w-12 h-12" />}
                    </div>
                </div>
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
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                    >
                        <FontAwesomeIcon icon={faInstagram} className="text-2xl w-5 h-5" />
                        {t(`LoginPanel:continueWithInstagram`)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
