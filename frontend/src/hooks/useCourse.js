import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";


// ✅ Get All Courses (Admin / Public)
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("/courses");
      return res.data;
    },
  });
};


// ✅ Get Courses by College
export const useCoursesByCollege = (collegeId) => {
  return useQuery({
    queryKey: ["courses", collegeId],
    queryFn: async () => {
      const res = await api.get(`/courses/college/${collegeId}`);
      return res.data;
    },
    enabled: !!collegeId, // only run when id exists
  });
};


// ✅ Add Course (Admin)
export const useAddCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/courses", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};


// ✅ Update Course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      api.put(`/courses/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};


// ✅ Delete Course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};
