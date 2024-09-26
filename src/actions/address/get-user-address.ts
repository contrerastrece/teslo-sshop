"use server";
import prisma from "@/lib/prisma";
export const getUserDbAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });

    if (!userAddress) return null;

    const { countryId, address2, ...rest } = userAddress;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
  } catch (error) {
    return null;
  }
};