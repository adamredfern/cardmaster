import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiReturnResponse, Card, Log } from 'types'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Cards', 'Logs'],
  endpoints: (builder) => ({
    getAllCards: builder.query<Card[], void>({
      query: () => '/card/all',
      providesTags: ['Cards'],
    }),
    addCard: builder.mutation<ApiReturnResponse, Card>({
      query: (card) => ({
        url: '/card/add',
        method: 'POST',
        body: { ...card },
      }),
      invalidatesTags: ['Cards', 'Logs'],
    }),
    removeCard: builder.mutation<ApiReturnResponse, { id: string }>({
      query: ({ id }) => ({
        url: '/card/remove',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Cards', 'Logs'],
    }),
    adjustBalance: builder.mutation<
      ApiReturnResponse,
      { id: string; amount: number }
    >({
      query: (data) => ({
        url: '/balance/adjust',
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Cards', 'Logs'],
    }),
    transferBalance: builder.mutation<
      ApiReturnResponse,
      { fromId: string; toId: string; amount: number }
    >({
      query: (data) => ({
        url: '/balance/transfer',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Cards', 'Logs'],
    }),
    getLogs: builder.query<Log[], void>({
      query: () => '/log/list',
      providesTags: ['Logs'],
      transformResponse: (res: Log[]) =>
        res.sort((a: Log, b: Log) => b.timestamp - a.timestamp),
    }),
    logEvent: builder.mutation<{ message: string }, { message: string }>({
      query: (event) => ({
        url: '/log/create',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Logs'],
    }),
    resetData: builder.mutation<{ message: string }, void>({
      query: (_) => ({
        url: '/reset-data',
        method: 'POST',
      }),
      invalidatesTags: ['Cards', 'Logs'],
    }),
  }),
})

export const {
  useGetAllCardsQuery,
  useAddCardMutation,
  useRemoveCardMutation,
  useAdjustBalanceMutation,
  useTransferBalanceMutation,
  useGetLogsQuery,
  useLogEventMutation,
  useResetDataMutation,
} = apiSlice
