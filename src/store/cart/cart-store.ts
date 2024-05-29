import { CartProduct, Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  //get
  getTotalItems: () => number;
  // orderSumary
  getOrderSumary: () => {
    total: number;
    tax: number;
    subtotal: number;
    itemsInCart: number;
  };
  // addToCart
  addProductToCart: (product: CartProduct) => void;
  // update
  updateProductToCart: (product: CartProduct, quantity: number) => void;
  // delete
  removeProductFromCart: (product: CartProduct) => void;
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
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getOrderSumary: () => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (subtotal, product) => product.price * product.quantity + subtotal,
          0
        );
        const tax = subtotal * 0.15;
        const total = subtotal + tax;

        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return { subtotal, tax, total, itemsInCart };
      },

      updateProductToCart: (product: CartProduct, quantity: number) => {
        // console.log(product, quantity);
        const { cart } = get();

        const updateCardProducts = cart.map((item) => {
          if (item.id == product.id && item.size == product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updateCardProducts });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const removeProduct = cart.filter((item) => {
          return !(item.id == product.id && item.size == product.size);
        });
        set({ cart: removeProduct });
      },
    }),
    {
      name: "shoping-cart",
      // skipHydration: true,
    }
  )
);
