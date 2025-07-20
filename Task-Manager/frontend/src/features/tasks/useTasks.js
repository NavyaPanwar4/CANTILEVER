import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";

const fetchTasks = async (filters) => {
  const { data } = await api.get("/tasks", { params: filters });
  return data;
};

const createTaskApi = (task) => api.post("/tasks", task);
const updateTaskApi = ({ id, body }) => api.put(`/tasks/${id}`, body);
const deleteTaskApi = (id) => api.delete(`/tasks/${id}`);

export function useTasks(filters = {}) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task) => api.post("/tasks", task),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (err) => {
      console.error("❌ Error creating task:", err?.response?.data || err.message);
    }
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => updateTaskApi({ id, body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (err) => {
      console.error("❌ Error updating task:", err?.response?.data || err.message);
    }
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (err) => {
      console.error("❌ Error deleting task:", err?.response?.data || err.message);
    }
  });
}
