import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';
import { useAuthContext } from '../auth/hooks/index.js';


export function useGetDistributor(id) {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${id}/csp_info`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      distributor: data?.data[0] || { },
      distributorLoading: isLoading,
      distributorError: error,
      distributorValidating: isValidating,
      distributorEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}



