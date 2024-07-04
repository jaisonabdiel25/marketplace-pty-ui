import { UserInfo } from "@/interfaces/Auth";
import Image from "next/image";
import { cookies } from 'next/headers';
import Link from "next/link";
import { redirect } from "next/navigation";
import { CustomAvatar } from "@/components/Customs/CustomAvatar";

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

export default async function ProfilePage() {

    const userInfo = await getUser();

    console.log(userInfo)
    if (!userInfo) {
        redirect('/')
    }

    return (
        <>
            <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
                <div className="flex flex-nowrap flex-col max-w-[700px] items-center card bg-white shadow-xl hover:shadow flex-grow mx-5">
                    <CustomAvatar className='w-64 h-64 -mt-28' user={userInfo} />
                    {/* <Image className="rounded-full -mt-20 border-4 border-white object-container" src={userInfo?.img} alt="" width={300} height={300} /> */}
                    <div className="text-center mt-2 text-3xl font-medium">{userInfo?.name} {userInfo.firstName}</div>
                    <div className="text-center mt-2 font-light text-sm">{userInfo?.email}</div>
                    <div className="text-center font-normal text-lg">{userInfo?.phone ?? ''}</div>

                        <div className=" px-6 text-center mt-2 font-light text-sm" style={{ overflowWrap: 'break-word', overflow: 'auto' }} >
                            {userInfo?.description ?? ''}
                        </div>

                    <div className="w-full mt-8">
                        <div className="p-4">
                            <div className="flex items-center justify-center text-center">
                                <Link href={'/profile/edit'}>
                                    <span className="font-bold">Editar</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}