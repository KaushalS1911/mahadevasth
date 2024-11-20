import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';
import { useAuthContext } from '../auth/hooks/index.js';

export function useGetBranchOrder(code) {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${code}/orders`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      order: data?.data || [],
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
      orderEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetBranchOrderCount() {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/noida/order/stats`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      orderCount: data?.data[0] || {} ,
      orderCountLoading: isLoading,
      orderCountError: error,
      orderCountValidating: isValidating,
      orderCountEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
