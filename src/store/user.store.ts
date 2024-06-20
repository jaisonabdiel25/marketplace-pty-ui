
import { UserInfo } from "@/interfaces/Auth";
import { create } from "zustand";

interface Props extends UserInfo {
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
}

export const useUserStore = create<Props>()((set) => ({
    id: '',
    name: '',
    firstName: '',
    email: '',
    active: false,
    phone: '',
    img: '',
    setUserInfo: (userInfo: UserInfo) => set(userInfo),
    clearUserInfo: () => set({ id: '', name: '', firstName: '', email: '', active: false, phone: '', img: '' })
}));