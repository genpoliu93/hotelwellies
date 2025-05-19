import { useState, useEffect } from "react";
import { ApiResponse } from "@/lib/api";

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useApi<T>(
  fetchFn: () => Promise<ApiResponse<T>> | null,
  dependencies: any[] = []
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const [refreshCounter, setRefreshCounter] = useState(0);

  const refetch = () => setRefreshCounter((prev) => prev + 1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!fetchFn) return;

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetchFn();

        if (!isMounted) return;

        if (!response) {
          throw new Error("请求未返回数据");
        }

        if (response.code === 200) {
          setState({
            data: response.data,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error(response.message || "请求失败");
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error("未知错误"),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies, refreshCounter]);

  return { ...state, refetch };
}
