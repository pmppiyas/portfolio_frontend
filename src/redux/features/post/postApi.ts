import { baseApi } from '@/redux/api/baseApi';
import { ICreatePostPayload, IPost, IUpdatePostPayload } from '@/types';

export interface IPostQueryParams {
  isFeatured?: boolean;
  category?: string;
  isPublished?: boolean;
}

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], IPostQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.isFeatured !== undefined) {
          queryParams.append('isFeatured', String(params.isFeatured));
        }
        if (params?.category) {
          queryParams.append('category', params.category);
        }
        if (params?.isPublished !== undefined) {
          queryParams.append('isPublished', String(params.isPublished));
        }

        const queryString = queryParams.toString();
        return {
          url: queryString ? `/post?${queryString}` : '/post',
          method: 'GET',
        };
      },
      transformResponse: (response: { data: IPost[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPostById: builder.query<IPost, number>({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IPost }) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<IPost, ICreatePostPayload | FormData>({
      query: (payload) => ({
        url: '/post/create',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: IPost }) => response.data,
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation<
      IPost,
      { id: number; data: Partial<ICreatePostPayload> | FormData }
    >({
      query: ({ id, data }) => ({
        url: `/post/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: { data: IPost }) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    updatePostSerial: builder.mutation<IPost, { id: number; serial: number }>({
      query: ({ id, serial }) => ({
        url: `/post/serial/${id}`,
        method: 'PATCH',
        body: { serial },
      }),
      transformResponse: (response: { data: IPost }) => response.data,
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    deletePost: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdatePostSerialMutation,
  useDeletePostMutation,
} = postApi;

// Project API Aliases
export const projectApi = postApi;
export const useGetAllProjectsQuery = useGetAllPostsQuery;
export const useGetProjectByIdQuery = useGetPostByIdQuery;
export const useCreateProjectMutation = useCreatePostMutation;
export const useUpdateProjectMutation = useUpdatePostMutation;
export const useDeleteProjectMutation = useDeletePostMutation;

