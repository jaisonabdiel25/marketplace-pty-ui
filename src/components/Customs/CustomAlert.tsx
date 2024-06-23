
import { Alert, AlertDescription, } from "@/components/ui/alert"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";

type Variant = "success" | "destructive";
interface Props {
    message: string;
    action: () => void;
    textButon: string;
    variant?: Variant;
    noTimeOut?: boolean;
}
export function CustomAlert(props: Props) {
    const { message, action, textButon, noTimeOut = false, variant = 'success' } = props;

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (noTimeOut) return;
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isVisible && (
                <Alert variant={variant} className="my-4 flex justify-between items-center">
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                    <Button variant="secondary" onClick={() => action()} className="mx-2">{textButon}</Button>
                </Alert>
            )}
        </>
    )
}
