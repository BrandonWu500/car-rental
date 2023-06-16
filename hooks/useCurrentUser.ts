import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/current-user",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
