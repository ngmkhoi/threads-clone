import { MessageCircle } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";

export default function Comment({ count }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
        // TODO: Add comment logic here
    }

    return (
        <>
            <button
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1.5"
                onClick={handleClick}
            >
                <MessageCircle className="w-5 h-5" />
                {count > 0 && (
                    <span className="text-sm">{count}</span>
                )}
            </button>

           <LoginDialog
               open={isOpen}
               onOpenChange={setIsOpen}
               icon={MessageCircle}
               title="DialogMessage:dialogMessages.Comment.title"
               description="DialogMessage:dialogMessages.Comment.description"
           />
        </>
    )
}
