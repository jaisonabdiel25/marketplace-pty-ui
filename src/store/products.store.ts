
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    search: string;
    getSearchs: () => string;
    setSearch: (search: string) => void;
    clearCart: () => void;
}

export const useProductStore = create<State>()(
    persist(
        (set, get) => ({
            search: '',

            // Methods
            getSearchs: () => {
                const { search } = get();
                return search;
            },

            setSearch: (search: string) => {
                set({ search });

            },

            clearCart: () => {
                set({ search: '' });
            },
        }),

        {
            name: "product-search",
        }
    )
);
