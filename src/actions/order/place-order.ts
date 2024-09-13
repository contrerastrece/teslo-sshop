"use server";

import { auth } from "@/auth.config";
import { Address, ValidSize } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSize;
}

export const placeOrder = async (
  productId: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();

    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: "No hay una session de usuario",
      };
    }

    console.log({ productId, address, userId });
  } catch (error) {
    return {
      ok: false,
      message: "",
    };
  }
};
