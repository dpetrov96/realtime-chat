import { useState } from "react";

type User = {
  id: string;
  username: string;
}

export type UserSelectorProps = {
  onClickUser?: (user: User) => void;
  selectedUsers?: string[];
  users: User[]
}

const UsersSelector = ({ users, onClickUser, selectedUsers }: UserSelectorProps) => {
  return (
    <div className="max-h-[140px] overflow-y-auto">
      {users?.map(({ id, username }) => (
        <div key={`${id}-${username}`}>
          <div onClick={() => onClickUser?.({ id, username })} className="flex items-center">
            <input checked={selectedUsers?.includes(id)} type="checkbox" />
            <span>{username}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersSelector;