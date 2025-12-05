import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";

function ThreadHint({ currentUser }) {
    const { t } = useTranslation("Common");

    return (
        <div className="flex gap-3 mt-3 items-center">
            <div className="flex justify-center w-10">
                <Avatar className="h-5 w-5 opacity-50">
                    <AvatarImage
                        src={currentUser?.avatar_url}
                        alt={currentUser?.username || "User"}
                    />
                    <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold text-[10px]">
                        {currentUser?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
            </div>
            <span className="text-muted-foreground text-[15px]">
                {t("createPost.addToThread")}
            </span>
        </div>
    );
}

export default ThreadHint;
