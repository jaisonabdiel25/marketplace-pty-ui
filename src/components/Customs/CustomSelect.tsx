import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { GlobalSelect } from "@/interfaces/global";

interface Props<T> {
    name: string
    options: GlobalSelect<T>[]
    value: string;
    onChange: (value: string) => void
}
export const CustomSelect = <T,>(props: Props<T>) => {
    const { name, options, value, onChange } = props;
    return (
        <Select name={name} value={value} onValueChange={(e) => onChange(e)}>
            <SelectTrigger name={name}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent onChange={(e) => console.log(e)} position="popper">
                {options.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
