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
    mutationFn: async (formData) => {
      return await api.post("/blog", formData);
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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("code", data.code);
      formData.append("description", data.description);

      if (data.image) {
        formData.append("image", data.image);
      }

      return api.put(`/blog/${id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};
