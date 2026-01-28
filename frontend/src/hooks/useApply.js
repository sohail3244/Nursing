import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useApply = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/leads", data); // ✅ CORRECT
      return res.data;
    }
  });
};
