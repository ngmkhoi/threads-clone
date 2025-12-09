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

import { Dialog, DialogContent } from "@/components/ui/dialog.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import PostCard from "@/components/post/PostCard.jsx";
import { ExternalLink } from "lucide-react";

const EmbedModal = ({ open, onOpenChange, post }) => {
    const { t } = useTranslation("PostCard");
    const [copied, setCopied] = useState(false);

    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/#/post/${post?.id}`;
    
    const embedCode = `<blockquote class="threads-post" data-post-id="${post?.id}"><a href="${postUrl}">${t("embed.viewOnThreads")}</a></blockquote><script async src="${baseUrl}/embed.js"></script>`;

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
            <DialogContent className="sm:max-w-[550px] p-0 gap-0 bg-content-background text-foreground !border-card-border overflow-hidden">
                {/* Post Preview */}
                <div className="bg-white dark:bg-zinc-900 rounded-t-xl border-b border-gray-200 dark:border-zinc-700">
                    <div className="max-h-[400px] overflow-y-auto">
                        <PostCard post={post} isDetailView isEmbedView />
                    </div>
                    
                    {/* View on Threads link */}
                    <div className="px-4 py-3 bg-content-background flex justify-end">
                        <Button className="bg-button-iframe-background hover:bg-button-iframe-background">
                            <a 
                                href={postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {t("embed.viewOnThreads")}
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Embed Code Section */}
                <div className="flex items-center gap-2 p-4">
                    <input
                        type="text"
                        readOnly
                        value={embedCode}
                        className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-lg text-muted-foreground truncate focus:outline-none"
                        onClick={(e) => e.target.select()}
                    />
                    <Button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 font-medium"
                    >
                        {copied ? t("embed.copiedButton") : t("embed.copyButton")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmbedModal;

