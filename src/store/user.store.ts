import { create } from "zustand";

interface Props {
    token: string;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useUserStore = create<Props>()((set) => ({
    token: '',
    setToken: (value: string) => set(state => ({ token: state.token = value})),
    clearToken: () => set({ token: ''})
}));