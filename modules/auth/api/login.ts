import { api } from "@/shared/api/apiClient";

export const login = async (data: LoginDto) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};