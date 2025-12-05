import { MessageCircle } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import AnimatedCounter from "@/components/Common/AnimatedCounter/index.jsx";

export default function Comment({ count, onToggleReply}) {
    const [isOpen, setIsOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const handleClick = () => {
        if(isAuthenticated) {
           onToggleReply()
        }else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <button
                className="flex items-center gap-1 p-1.5 w-[50px] justify-start text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={handleClick}
            >
                <MessageCircle className="w-5 h-5" />
                <AnimatedCounter
                    value={count}
                    className="text-sm"
                />
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
