import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function useModules() {
  const { data, error, mutate } = useSWR('/api/modules', fetcher);
  return {
    modules: data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
