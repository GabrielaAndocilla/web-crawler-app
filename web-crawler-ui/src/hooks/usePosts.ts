import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePost = (page?:number) => {
  let url =`http://localhost:8081/api/posts`
  if(page && page > 1) url += `?page=${page}`

  return useQuery({
    queryKey: ['posts',page],
    queryFn: () => axios.get(url),
    placeholderData: keepPreviousData,
    staleTime: Infinity,

  })
}
