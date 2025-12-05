import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";

function DialogFooter({ isFormValid, loading, formId }) {
    const { t } = useTranslation("Common");

    return (
        <div className="border-t !border-card-border p-4 flex items-center justify-between">
            <span className="text-muted-foreground text-[13px]">
                {t("createPost.anyoneCanReply")}
            </span>
            <Button
                type="submit"
                form={formId}
                disabled={!isFormValid || loading}
                className="rounded-xl px-5"
            >
                {loading ? (
                    <>
                        <Spinner className="mr-2 h-4 w-4" />
                        {t("createPost.posting")}
                    </>
                ) : (
                    t("createPost.post")
                )}
            </Button>
        </div>
    );
}

export default DialogFooter;
