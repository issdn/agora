import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { useNavigate } from "react-router-dom";

export default function SimpleUserDataList({
  url,
  isOpen,
  emptyMessage = "Nothing to see...",
}: {
  url: string;
  isOpen: boolean;
  emptyMessage: string;
}) {
  const [data, setData] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(url).then((res) => setData(res.data));
  }, [url]);

  const renderDataList = () => {
    return (
      <div className="flex flex-col gap-y-2 text-xl">
        {data.map((n) => (
          <p
            key={n}
            onClick={() => navigate("/user/" + n)}
            className="pl-2 border-l border-black cursor-pointer hover:underline underline-offset-2"
          >
            {n}
          </p>
        ))}
      </div>
    );
  };

  if (isOpen) return data.length ? renderDataList() : <p>{emptyMessage}</p>;
  else return null;
}
