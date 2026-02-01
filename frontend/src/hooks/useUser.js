import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data;
    },
  });
};
