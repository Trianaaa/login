import { create } from "zustand";

const useStoreEmployee = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useStoreEmployee;
