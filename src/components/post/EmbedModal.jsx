/**
 * EmbedModal Component
 * 
 * This component handles the embed functionality for posts.
 * The embed feature displays a post in an embeddable format that can be 
 * shared and embedded on external websites.
 * 
 * Related components:
 * - PostCard: Displays individual post content
 * - EmbedLayout: Layout wrapper for embedded view
 * - Embed page: The page that uses this modal/component
 * 
 * @see /src/pages/Embed/index.jsx - Main Embed page
 * @see /src/layouts/EmbedLayout/index.jsx - Layout for embed view
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.jsx";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";

const EmbedModal = ({ open, onOpenChange, post }) => {
    const { t } = useTranslation("PostCard");
    const [copied, setCopied] = useState(false);

    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/#/${post?.user?.username}/post/${post?.id}/embed`;
    
    const embedCode = `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0" allowtransparency="true"></iframe>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true);
            toast.success(t("embed.copied") || "Embed code copied!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error(t("embed.copyError") || "Failed to copy");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-content-background text-foreground !border-card-border">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold">
                        {t("embed.title") || "Embed Post"}
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 p-4">
                    <p className="text-sm text-muted-foreground">
                        {t("embed.description") || "Copy the code below to embed this post on your website."}
                    </p>
                    
                    <div className="relative">
                        <pre className="p-3 bg-muted rounded-lg text-xs overflow-x-auto">
                            <code>{embedCode}</code>
                        </pre>
                        
                        <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                        <p>{t("embed.preview") || "Preview:"}</p>
                        <a 
                            href={embedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline break-all"
                        >
                            {embedUrl}
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmbedModal;
