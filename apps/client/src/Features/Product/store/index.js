import { create } from "zustand";

const useStoreProduct = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useStoreProduct;
