import { useState, useEffect, useDebugValue } from "react";

export type AddressData = {
  hash160: string;
  address: string;
  final_balance: number;
};

export interface ApiError {
  error: string;
}

export async function fetchApi<T>(route: string): Promise<T> {
  let response = await fetch(`http://localhost:8080${route}`);
  let content = await response.json();
  if (response.ok) {
    return content;
  } else {
    throw content;
  }
}

export function useApi<T>(route: string): T | ApiError | null {
  const [result, setResult] = useState<T | ApiError | null>(null);

  useDebugValue(route);

  useEffect(() => {
    fetchApi<T>(route)
      .then((res) => {
        setResult(res);
      })
      .catch((e) => setResult(e));
  }, [route]);

  return result;
}
