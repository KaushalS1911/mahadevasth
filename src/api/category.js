import useSWR from 'swr';
import { fetcher } from '../utils/axios';
import { useMemo } from 'react';

export function useGetCategories() {
  const URL = `https://interactapiverse.com/mahadevasth/shape/articles/article-categories`;

  const { data, isLoading, error, isValidating,mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      categories: data?.data ,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
      categoryEmpty: !isLoading && !data?.data?.length,
      mutate
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
