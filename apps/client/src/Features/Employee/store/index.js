import { create } from "zustand";
import { DEFAULT_DATA } from "../components/TableEmployee/columns";

const useStoreEmployee = create((set) => ({
  data: [...DEFAULT_DATA],
  setData: (data) => set({ data }),
}));

export default useStoreEmployee;
