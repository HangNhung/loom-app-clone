import { useEffect, useState } from "react";
import { useQueryData } from "./useQueryData";
import { searchUsers } from "@/actions/user";

export const useSearch = (key: string, type: "USER") => {
  const [querySearch, setQuerySearch] = useState("");
  const [debound, setDebound] = useState("");
  const [onUser, setOnUser] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuerySearch(value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebound(querySearch);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [querySearch]);

  const { refetch, isFetching } = useQueryData(
    [key, debound],
    async ({ queryKey }) => {
      if (type === "USER") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) {
          setOnUser(users.data);
        }
      }
    }
  );

  useEffect(() => {
    if (debound) {
      refetch();
    }
    if (!debound) {
      setOnUser(undefined);
    }

    return () => {
      debound;
    };
  }, [debound]);

  return {
    querySearch,
    onSearch,
    onUser,
    isFetching,
  };
};
