import { Repeat } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import {useSelector} from "react-redux";


export default function Repost({ count }) {
    const [isOpen, setIsOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const handleClick = () => {
        if(isAuthenticated) {
            console.log('Đang làm logic repost')
        }else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <button
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1.5"
                onClick={handleClick}
            >
                <Repeat className="w-5 h-5" />
                {count > 0 && (
                    <span className="text-sm">{count}</span>
                )}
            </button>

            <LoginDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                icon={Repeat}
                title="DialogMessage:dialogMessages.Repost.title"
                description="DialogMessage:dialogMessages.Repost.description"
            />
        </>
    )
}
