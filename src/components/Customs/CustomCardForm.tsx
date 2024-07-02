import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";

interface Props {
    children: React.ReactNode;
    onAction: () => void;
    onCancel: () => void;
    disabledAction?: boolean
    labelButton: string
}

export const CustomCardForm = ({ children, onAction, onCancel, labelButton, disabledAction = false }: Props) => {
    return (
        <div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Vende tu producto</CardTitle>
                    <CardDescription>llena cada uno de los campos para poner a la venta tu producto</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => onCancel()} variant="outline">Cancelar</Button>
                    <Button
                        disabled={disabledAction}
                        onClick={() => onAction()}
                    >
                        {labelButton}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
