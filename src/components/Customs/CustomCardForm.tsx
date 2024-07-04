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
    title: string;
    description: string;
}

export const CustomCardForm = ({title, description, children, onAction, onCancel, labelButton, disabledAction = false }: Props) => {
    return (
        <div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
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
