import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {useTranslation} from "react-i18next";

function AvatarComponent({ post }) {
    const { t } = useTranslation('PostCard');
    return (
        <div className="flex-shrink-0">
            <Avatar>
                <AvatarImage
                    src={post?.user?.avatar_url}
                    alt={t('altText.userAvatar')}
                    className="cursor-pointer"
                />
                <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold">
                    {post?.user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default AvatarComponent