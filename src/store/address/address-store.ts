import { AddressForm } from "@/app/(shop)/checkout/address/ui/AddressForm";
import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address })
      },
    }),
    { name: "address-storage" }
  )
);
