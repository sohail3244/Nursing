import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useCollegeSearch = (search) => {
  return useQuery({
    queryKey: ["college-search", search],
    queryFn: async () => {
      if (!search) return [];
      const res = await api.get(`/college/search?q=${search}`);
      return res.data.data;
    },
    enabled: !!search,
  });
};
