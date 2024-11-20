import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';
import { useAuthContext } from '../auth/hooks/index.js';

export function useGetProfile() {
  const { vendor } = useAuthContext();
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp_detail/${vendor?.phone_number}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      profile: data?.data[0] || { },
      profileLoading: isLoading,
      profileError: error,
      profileValidating: isValidating,
      profileEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}export function useGetBranchInfo() {
  const { vendor } = useAuthContext();
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${vendor?.branch}/info`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      branchProfile: data?.data[0] || { },
      profileLoading: isLoading,
      profileError: error,
      profileValidating: isValidating,
      profileEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
