import { useState, useEffect } from "react";

export const useFetch = <T>(url: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};
