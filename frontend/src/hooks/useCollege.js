import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

// GET
export const useColleges = () => {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await api.get("/college");
      return res.data;
    },
  });
};

// CREATE
export const useAddCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      return api.post("/college", formData); // ✅ DIRECT
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};

// UPDATE
export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return api.put(`/college/${id}`, data); // ✅ DIRECT
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};

// DELETE
export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/college/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};

