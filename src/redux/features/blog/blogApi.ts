import { baseApi } from '@/redux/api/baseApi';
import { IBlog, ICreateBlogPayload } from '@/types';

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs
    getAllBlogs: builder.query<IBlog[], void>({
      query: () => ({
        url: '/blog',
        method: 'GET',
      }),
      transformResponse: (response: { data: IBlog[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Blog' as const, id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),

    // Get blog by ID
    getBlogById: builder.query<IBlog, number>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IBlog }) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Blog', id }],
    }),

    // Create a new blog (supports JSON or FormData with file)
    createBlog: builder.mutation<IBlog, ICreateBlogPayload | FormData>({
      query: (payload) => ({
        url: '/blog/create',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: IBlog }) => response.data,
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),

    // Update blog (supports JSON or FormData with file)
    updateBlog: builder.mutation<IBlog, { id: number; data: Partial<ICreateBlogPayload> | FormData }>({
      query: ({ id, data }) => ({
        url: `/blog/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: { data: IBlog }) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),

    // Delete blog
    deleteBlog: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
