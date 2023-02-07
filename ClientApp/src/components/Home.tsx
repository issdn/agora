import React from "react";
import PostsList from "./post/PostsList";
import TableSwitch, { useTableSwitch } from "./TableSwitch";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../types/appTypes";

const tableItems = [
  { key: "following", label: "Following" },
  { key: "new", label: "New" },
];

export function Home() {
  const { token } = useAuth() as { token: AuthContextType["token"] };
  const { currOpenTab, setCurrOpenTab } = useTableSwitch(tableItems);

  return (
    <div className="flex flex-col gap-y-4">
      <TableSwitch
        items={tableItems}
        currOpenTab={currOpenTab}
        setCurrOpenTab={setCurrOpenTab}
      />
      <PostsList
        emptyMessage={
          token
            ? "You have no followers!"
            : "Login or register to follow people."
        }
        isOpen={currOpenTab === "following"}
        url="api/post?category=following"
      />
      <PostsList
        emptyMessage="There are not posts on this platform 😢"
        isOpen={currOpenTab === "new"}
        url="api/post"
      />
    </div>
  );
}
