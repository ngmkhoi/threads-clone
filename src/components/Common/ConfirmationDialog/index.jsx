import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";

function ConfirmationDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText,
    cancelText = "Cancel",
    onConfirm,
    variant = "default", // "default" | "destructive"
    isLoading = false
}) {
    const handleConfirm = async () => {
        await onConfirm?.();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-dialog-background !rounded-2xl">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-center text-xl font-bold">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 sm:flex-col">
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className={`w-full rounded-xl cursor-pointer ${
                            variant === "destructive" 
                                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
                                : ""
                        }`}
                    >
                        {isLoading ? "..." : confirmText}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="w-full rounded-xl cursor-pointer"
                    >
                        {cancelText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmationDialog;
