import clsx from 'clsx';
import Avarar from 'react-avatar';

type User = {
  id: string;
  username: string;
  email: string;
}

export type UserSelectorProps = {
  onClickUser?: (user: User) => void;
  selectedUsers?: string[];
  users: User[]
  error?: string;
}

const UsersSelector = ({ users, onClickUser, selectedUsers, error }: UserSelectorProps) => (
  <>
    <div className="max-h-[300px] overflow-y-auto rounded-md shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]">
      {users?.map(({ id, username, email }) => {
        const isSelected = selectedUsers?.includes(id);

        return (
          <div key={`${id}-${username}`}>
            <div
              onClick={() => onClickUser?.({ id, username, email })}
              className={clsx(
                "select-none cursor-pointer flex gap-3 items-center border-b border-b-gray-200 py-2 px-2",
                isSelected && "bg-gray-100"
              )}
            >
              <input checked={isSelected} type="checkbox" />
              <div className="flex items-center gap-2">
                <Avarar name={username} size="30" round />
                <div>
                  <span className="block text-sm font-semibold truncate">{username}</span>
                  <span className="block text-xs italic text-gray-500 truncate">{email}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    {Boolean(error) && (
      <p className="mt-2 font-semibold text-xs text-rose-700">{error}</p>
    )}
  </>
)

export default UsersSelector;