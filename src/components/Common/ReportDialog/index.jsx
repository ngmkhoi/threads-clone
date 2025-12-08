import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useTranslation } from "react-i18next";

const REPORT_REASONS = [
    { key: "spam", value: "spam" },
    { key: "nudity", value: "nudity" },
    { key: "hate_speech", value: "hate_speech" },
    { key: "violence", value: "violence" },
    { key: "harassment", value: "harassment" },
    { key: "false_info", value: "false_info" },
    { key: "scam", value: "scam" },
    { key: "other", value: "other" }
];

function ReportDialog({
    open,
    onOpenChange,
    onSubmit,
    isLoading = false
}) {
    const { t } = useTranslation('PostCard');
    const [selectedReason, setSelectedReason] = useState(null);

    const handleSubmit = async () => {
        if (selectedReason) {
            await onSubmit?.(selectedReason, "");
            setSelectedReason(null);
        }
    };

    const handleOpenChange = (newOpen) => {
        if (!newOpen) {
            setSelectedReason(null);
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md bg-dialog-background !rounded-2xl">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-center text-xl font-bold">
                        {t('report.title')}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        {t('report.description')}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-col gap-1 mt-2">
                    {REPORT_REASONS.map((reason) => (
                        <button
                            key={reason.key}
                            onClick={() => setSelectedReason(reason.value)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                                selectedReason === reason.value
                                    ? "bg-secondary"
                                    : "hover:bg-secondary/50"
                            }`}
                        >
                            {t(`report.reasons.${reason.key}`)}
                        </button>
                    ))}
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={!selectedReason || isLoading}
                    className="w-full mt-4 rounded-xl cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                    {isLoading ? "..." : t('report.submit')}
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ReportDialog;
