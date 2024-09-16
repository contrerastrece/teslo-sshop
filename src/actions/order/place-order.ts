"use server";

import { auth } from "@/auth.config";
import { Address, ValidSize } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSize;
}

export const placeOrder = async (productsId: ProductToOrder[], address: Address) => {
  console.log(address)

  try {
    const session = await auth();

    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: "No hay una session de usuario",
      };
    }

    // Obtener la información de los productos
    const products = await prisma.product.findMany({
      where: { id: { in: productsId.map((p) => p.productId) } },
    });

    // calcular los montos
    const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);

    // calcular los totales de tax, subtotal, total
    const { subTotal, tax, total } = productsId.reduce((totals, item) => {
      // obtener la cantidad del producto de mi carrito
      const productQuantity = item.quantity;

      // buscar el producto por el id
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe -500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
      { subTotal: 0, tax: 0, total: 0 }
    );


    // crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {

      // 1. Actualizar el stock de los productos




      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productsId.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0
              }))
            }

          }

        }
      })

      // validar, si el pricio es cero, entonces lanzar un error


      // 3. Crear la dirección de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })



      return {
        order: order,
        updateProduct: [],
        orderAddress: orderAddress
      }
    })




    // console.log({ subTotal, tax, total });
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo grabar su transacción"
    };
  }
};
