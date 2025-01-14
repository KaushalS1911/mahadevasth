import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';
import { useAuthContext } from '../auth/hooks/index.js';

export function useGetCSP() {
  const {vendor} = useAuthContext()
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${vendor?.branch}/csp`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      csp: data?.data ,
      cspLoading: isLoading,
      cspError: error,
      cspValidating: isValidating,
      cspEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
