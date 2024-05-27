import { CartProduct, Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  //
  getTotalItems: () => number;
  // addToCart
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // verificar si existe el product
        const productInCart = cart.some(
          (item) => item.id == product.id && item.size == product.size
        );

        // si no existe agregar al cart
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // Incremetar producto
        const updateCartProducts = cart.map((item) => {
          if (item.id == product.id && item.size == product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });
        // agregamos al cart los productos actualizados
        set({ cart: updateCartProducts });
      },
      getTotalItems: () => {
        const {cart}=get();

        return cart.reduce((total,item)=>total+item.quantity,0);
      },
    }),
    {
      name: "shoping-cart",
      // skipHydration: true,
    }
  )
);