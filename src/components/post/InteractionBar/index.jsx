import { Heart, MessageCircle, Repeat, Send } from 'lucide-react'

export default function InteractionBar({likes, comments, repost ,shares}) {
    const interactions = [
        { icon: Heart, count: likes, label: 'Like' },
        { icon: MessageCircle, count: comments, label: 'Comment' },
        { icon: Repeat, count: repost, label: 'Repost' },
        { icon: Send, count: shares, label: 'Share'}
    ]

    return (
        <div className="flex items-center gap-1 mt-3">
            {interactions.map((interaction) => {
                const Icon = interaction.icon

                return (
                    <button key={interaction.label}
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1.5"
                    >
                        <Icon className="w-5 h-5" />
                        {interaction.count > 0 && (
                            <span className="text-sm">{interaction.count}</span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
