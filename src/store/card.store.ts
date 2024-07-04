
import { ProductResponse } from "@/interfaces/Products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: ProductResponse[];

  getTotalItems: (userId: string) => number;
  getCartToUser: (userId: string) => ProductResponse[];
  getSummaryInformation: (userId: string) => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: ProductResponse, userCartId: string) => void;
  removeProduct: (product: ProductResponse) => void;

  clearCart: (userId: string) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getCartToUser: (userId: string) => {
        const { cart } = get();
        return cart.filter(item => item.userCartId === userId);
      },

      getTotalItems: (userId: string) => {
        const { cart } = get();
        return cart.filter(item => item.userCartId === userId).reduce((total, item) => total + 1, 0);
      },

      getSummaryInformation: (userId: string) => {
        const { cart } = get();

        const subTotal = cart.filter(item => item.userCartId === userId).reduce(
          (subTotal, product) => 1 * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.07;
        const total = subTotal + tax;
        const itemsInCart = cart.filter(item => item.userCartId === userId).reduce(
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

      addProductTocart: (product: ProductResponse, userCartId: string) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada

        const productInCart = cart.some(
          (item) => item.id === product.id && item.userCartId === userCartId
        );

        const productCart = {
          ...product,
          userCartId,
        };



        if (!productInCart) {
          set({ cart: [...cart, productCart] });
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

      clearCart: (userId: string) => {
        const { cart } = get();

        const productFilter = cart.filter(x => x.userCartId !== userId)
        set({ cart: productFilter });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
