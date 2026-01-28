import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

/* ==============================
   ✅ GET ALL COURSES (PUBLIC)
================================ */
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("/course");
      return res.data;
    },
  });
};


/* ==============================
   ✅ ADD COURSE (ADMIN)
================================ */
export const useAddCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/course", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};


/* ==============================
   ✅ UPDATE COURSE (ADMIN)
================================ */
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/course/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};


/* ==============================
   ✅ DELETE COURSE (ADMIN)
================================ */
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return api.delete(`/course/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};
