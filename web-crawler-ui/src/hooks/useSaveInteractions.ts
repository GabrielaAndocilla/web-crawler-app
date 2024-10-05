import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserInteraction } from "../models/UserInteraction";


export const useSaveInteractions = () => {
  const queryClient = useQueryClient()
  const url = process.env.REACT_APP_BACK_URL || ''
  return useMutation({
    mutationFn: (interaction:UserInteraction):Promise<UserInteraction> =>  axios.post(`${url}/interactions`,interaction),
    onSuccess: (res) =>  queryClient.invalidateQueries({ queryKey: ['metrics'] })
  })
}
