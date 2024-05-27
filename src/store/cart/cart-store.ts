import { CartProduct, Product } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];

  // addToCart
  addToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
  addToCart: (product: CartProduct) => {
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
}));
