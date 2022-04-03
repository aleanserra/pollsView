import { useQuery } from "react-query";
import { api } from "../api";
import { Health } from "../../interfaces/useHealth.interface";

export async function getHealthStatus(): Promise<Health> {
  const { data } = await api.get("health");
  return data;
}

export function useHealth() {
  return useQuery("health", getHealthStatus, {
    staleTime: 1000 * 5, //5 seconds
  });
}
