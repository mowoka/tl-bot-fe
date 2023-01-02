import { useCallback, useState } from "react"

interface UseModalElement {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}
export const useModalElement = (): UseModalElement => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, [])

    return {
        open,
        handleOpen,
        handleClose,
    }
}