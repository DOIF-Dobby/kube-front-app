"use client";

import { myAxios } from "@/libs/axios-instance";
import { useQuery } from "@tanstack/react-query";

export default function TestUI() {
  const { data, isFetching } = useQuery({
    queryKey: ["/users"],
    queryFn: async () => {
      const response = await myAxios("/users");
      return response.data;
    },
  });

  return (
    <div>
      <h1>Test UI</h1>
      <div>
        <button className="bg-red-200">GET User</button>
      </div>
      <div>
        {isFetching ? (
          <div>로딩중</div>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
