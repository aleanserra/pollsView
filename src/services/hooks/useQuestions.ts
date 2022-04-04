import { useQuery } from "react-query";
import { api } from "../api";
import { Question } from "../../interfaces/useQuestions.interface";

export async function getQuestions(
  page: number,
  filter: string
): Promise<Question[]> {
  const { data } = await api.get(
    `questions?limit=10&offset=${page}&filter=${filter}`
  );
  return data;
}

export async function getQuestion(id: number): Promise<Question[]> {
  const { data } = await api.get(`questions/${id}`);
  return data;
}

export function useQuestions(page: number, filter: string) {
  return useQuery("questions", () => getQuestions(page, filter), {
    staleTime: 1000 * 5, //5 seconds
  });
}
