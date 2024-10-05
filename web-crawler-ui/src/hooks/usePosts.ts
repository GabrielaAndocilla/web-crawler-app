import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

const validatePage = (page:number|undefined) => page && page > 1
export const usePost = (page?:number, filters?:{limit?:string|undefined, type?:string|undefined}) => {
  let url = `${process.env.REACT_APP_BACK_URL || ''}/posts`
  if(validatePage(page)) url += `?page=${page}`
  if(filters?.limit && filters?.type) url += `${validatePage(page) ? '&':'?'}limit=${filters.limit}&type=${filters.type}`
  return useQuery({
    queryKey: ['posts',page,filters],
    queryFn: () => axios.get(url),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  })
}
