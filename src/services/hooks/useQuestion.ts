import { useQuery } from "react-query";
import { api } from "../api";
import { Question } from "../../interfaces/useQuestions.interface";

export async function getQuestion(id: number): Promise<Question> {
  const { data } = await api.get(`questions/${id}`);
  return data;
}

export function useQuestion(id: number, enabled: boolean) {
  return useQuery("question", () => getQuestion(id), {
    staleTime: 1000 * 5, //5 seconds
    enabled: enabled,
  });
}
