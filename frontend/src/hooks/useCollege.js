import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

// ✅ GET ALL COLLEGES
export const useColleges = () => {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await api.get("/colleges");
      return res.data;
    },
  });
};


// ✅ ADD COLLEGE (with image)
export const useAddCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("courseId", data.courseId);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await api.post("/colleges", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};


// ✅ UPDATE COLLEGE
export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("courseId", data.courseId);

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await api.put(`/colleges/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};


// ✅ DELETE COLLEGE
export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/colleges/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};
