import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useInteractionMetrics = () => {
  const url = process.env.REACT_APP_BACK_URL || ''
  return useQuery({
    queryKey:['metrics'],
    queryFn: () => axios.get(`${url}/interactions/metrics`),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  })
}
