import { Send, Link, Image } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSelector.js";
import AnimatedCounter from "@/components/Common/AnimatedCounter/index.jsx";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Share({ post, count }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { t } = useTranslation('PostCard');

    const handleOpenChange = (open) => {
        // If trying to open and not authenticated, show login dialog instead
        if (open && !isAuthenticated) {
            setIsDialogOpen(true)
            return;
        }
        // Otherwise, just set the dropdown state directly
        setDropdownOpen(open)
    }

    const handleCopyLink = () => {
        // Get base URL including hash prefix for HashRouter
        const baseUrl = window.location.origin + window.location.pathname;
        const postUrl = `${baseUrl}#/post/${post.id}`;
        navigator.clipboard.writeText(postUrl);
        toast.success(t('share.linkCopied'));
    };

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild className="p-0">
                    <button
                        className="flex items-center gap-1 p-1.5 w-[50px] justify-start text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <Send className="w-5 h-5" />
                        <AnimatedCounter value={count} className="text-sm" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="min-w-[180px] rounded-xl bg-content-background py-2">
                    <DropdownMenuItem
                        className="flex items-center justify-between cursor-pointer px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors duration-150"
                        onClick={handleCopyLink}
                    >
                        <span className="font-medium">{t("share.copyLink")}</span>
                        <Link className="w-5 h-5" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <LoginDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                icon={Send}
                title="DialogMessage:dialogMessages.Share.title"
                description="DialogMessage:dialogMessages.Share.description"
            />
        </>
    )
}
