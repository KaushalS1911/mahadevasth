import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';

export function useGetArticles() {
  const URL = `https://interactapiverse.com/mahadevasth/shape/articles/upload`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      articles: data?.data ,
      articleLoading: isLoading,
      articleError: error,
      articleValidating: isValidating,
      articleEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
