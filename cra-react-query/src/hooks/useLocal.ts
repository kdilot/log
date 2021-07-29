import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const LOCAL_API_URL = 'http://localhost:3100/api/v1'

export interface PostProps {
  no?: number
  title: string
  contents: string
}

export const usePosts = (params?: object) => {
  return useQuery(
    'posts',
    () =>
      axios
        .get(`${LOCAL_API_URL}/posts`, {
          params,
        })
        .then((res) => res.data.data),
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  )
}

export const usePost = (no: number) => {
  return useQuery(
    ['post', no],
    () => axios.get(`${LOCAL_API_URL}/post/${no}`).then((res) => res.data.data),
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  )
}

export const usePostUpdate = () => {
  const queryCache = useQueryClient()
  return useMutation(
    (params: PostProps) =>
      axios
        .put(`${LOCAL_API_URL}/post/${params.no}`, {
          ...params,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(['post'])
      },
    }
  )
}

export const usePostCreate = () => {
  const queryCache = useQueryClient()
  return useMutation(
    (params: PostProps) =>
      axios
        .post(`${LOCAL_API_URL}/post`, {
          ...params,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(['post'])
      },
    }
  )
}
