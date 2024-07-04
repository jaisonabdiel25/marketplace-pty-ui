import { EditUser } from "@/components/User/EditUser";
import { UserInfo } from "@/interfaces/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const getUser = async (): Promise<UserInfo> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/users`

    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-cache',
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch((error) => {
            console.log(error)
        })

    return await response;
}

export default async function EditProfilePage() {

    const user = await getUser();

    if (!user) {
        redirect('/')
    }


    return (
        <>
            <EditUser user={user} />
        </>
    );
}