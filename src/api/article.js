import { endpoints, fetcher } from '../utils/axios.js';
import useSWR from 'swr';
import { useMemo } from 'react';

export function useGetArticles() {
  const URL = `https://interactapiverse.com/mahadevasth/shape/articles`;

  const { data, isLoading, error, isValidating,mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      articles: data?.data ,
      articleLoading: isLoading,
      articleError: error,
      articleValidating: isValidating,
      articleEmpty: !isLoading && !data?.data?.length,
      mutate
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetSingleArticles(id) {
  const URL = `https://interactapiverse.com/mahadevasth/shape/articles/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      singleArticle: data?.data[0] ,
      singleArticleLoading: isLoading,
      singleArticleError: error,
      singleArticleValidating: isValidating,
      singleArticleEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data[0], error, isLoading, isValidating]
  );

  return memoizedValue;
}
