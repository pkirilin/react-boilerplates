import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    setCount: builder.mutation<number, void>({
      queryFn: async (args, {}, extraOptions, baseQuery) => {
        await new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });

        const result = await baseQuery({
          url: 'count.json',
          method: 'GET',
        });

        return { data: result.data as number };
      },
    }),
  }),
});

export const { useSetCountMutation } = counterApi;
