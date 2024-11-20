import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';
import { useAuthContext } from '../auth/hooks/index.js';


export function useGetStates() {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      stats: data?.data || [],
      statsLoading: isLoading,
      statsError: error,
      statsValidating: isValidating,
      statsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetBranch(stateId) {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/branch`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      branch: data?.data || [],
      branchLoading: isLoading,
      branchError: error,
      branchValidating: isValidating,
      branchEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetDistrict(stateId) {
  const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/district`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      district: data?.data || [],
      districtLoading: isLoading,
      districtError: error,
      districtValidating: isValidating,
      districtEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}



