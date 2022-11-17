import { useEffect } from "react";

export function useGetData(url, setLessonsData, setIsLoading, setError) {
  useEffect(() => {
    fetch(url)
      .then((x) => x.json())
      .then(
        (data) => {
          setLessonsData(data);
          setIsLoading(true);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);
}
