import useSWR from "swr";
import { axiosInstance } from "./axios";
import { User } from "./types";

export function useUsers() {
  const { data, error, isLoading } = useSWR<User[]>("/users", async () => {
    const response = await axiosInstance.get("/v1/auth/get-users");
    return response.data.data;
  });

  return {
    users: data,
    isUsersLoading: isLoading,
    usersError: error,
  };
}
