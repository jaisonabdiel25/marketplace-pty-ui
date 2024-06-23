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
}

export const CustomCardForm = ({ children, onAction, onCancel }: Props) => {
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
                        onClick={() => onAction()}
                    >
                        Crear
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
