import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

/* ==============================
   ✅ GET ALL BLOGS (PUBLIC)
================================ */
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get("/blog");
      return res.data;
    },
  });
};


/* ==============================
   ✅ ADD BLOG (ADMIN)
================================ */
export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      console.log("🔥 API HIT");
      return api.post("/blog", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};





/* ==============================
   ✅ DELETE BLOG (ADMIN)
================================ */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return api.delete(`/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};


export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      // ✅ data is already FormData
      return api.put(`/blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};

