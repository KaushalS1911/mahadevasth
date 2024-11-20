import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';

export function useGetCommodities() {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      commodities: data?.data || [],
      commoditiesLoading: isLoading,
      commoditiesError: error,
      commoditiesValidating: isValidating,
      commoditiesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
