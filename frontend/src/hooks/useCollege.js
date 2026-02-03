import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

/* ===========================
   GET ALL COLLEGES
=========================== */
export const useColleges = () => {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await api.get("/college");
      return res.data;
    },
  });
};

/* ===========================
   GET SINGLE COLLEGE BY ID
=========================== */
export const useCollegeById = (id) => {
  return useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      const res = await api.get(`/college/${id}`);
      return res.data;
    },
    enabled: !!id, // 🔥 important
  });
};

/* ===========================
   ADD COLLEGE
=========================== */
export const useAddCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      api.post("/college", formData, {
        
      }),

    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};



/* ===========================
   UPDATE COLLEGE
=========================== */
export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      api.put(`/college/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};


/* ===========================
   DELETE COLLEGE
=========================== */
export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/college/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["colleges"]);
    },
  });
};


export const useCollegesByCourse = (courseId) => {
  return useQuery({
    queryKey: ["colleges-by-course", courseId],
    queryFn: async () => {
      const res = await api.get(`/college/college/by-course?course=${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });
};


export const useCollegeCourses = (collegeId) => {
  return useQuery({
    queryKey: ["college-courses", collegeId],
    queryFn: async () => {
      const res = await api.get(`/college/${collegeId}/courses`);
      return res.data;
    },
    enabled: !!collegeId,
  });
};