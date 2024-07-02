
import { ProductResponse } from "@/interfaces/Products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: ProductResponse[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: ProductResponse) => void;
  removeProduct: (product: ProductResponse) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + 1, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => 1 * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.07;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + 1,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: (product: ProductResponse) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id 
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
      },

    //   updateProductQuantity: (product: ProductResponse, quantity: number) => {
    //     const { cart } = get();

    //     const updatedCartProducts = cart.map((item) => {
    //       if (item.id === product.id && item.size === product.size) {
    //         return { ...item, quantity: quantity };
    //       }
    //       return item;
    //     });

    //     set({ cart: updatedCartProducts });
    //   },

      removeProduct: (product: ProductResponse) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id 
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
