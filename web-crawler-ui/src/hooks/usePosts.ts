import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePost = () => {
  return useQuery({ queryKey: ['posts'], queryFn: () => axios.get('http://localhost:8081/api/posts')})
}
