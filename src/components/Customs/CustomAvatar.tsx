import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { UserInfo } from "@/interfaces/Auth"

interface Props {
    user: UserInfo;
    className?: string
}

export function CustomAvatar({ user, className }: Props) {

    const initials = `${user.name.charAt(0).toUpperCase()} ${user.firstName.charAt(0).toUpperCase()}`

    return (
        <Avatar className={className}>
            <AvatarImage className={`object-cover`} src={user.img} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
