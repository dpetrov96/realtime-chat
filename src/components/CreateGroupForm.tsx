import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

import { trpc } from '@/utils/trpc';
import { Input, Button, UsersSelector } from '@/components';
import { createGroupSchema } from '@/schema';

export type CreateGroupFormProps = {
  onCreateGroup?: () => void;
}

type FormType = z.infer<typeof createGroupSchema>;

const CreateGroupForm = ({ onCreateGroup }: CreateGroupFormProps) => {
  const { data: users } = trpc.userRouter.getUsers.useQuery();
  const usersList = users?.map(({ _id, username, email }) => ({ id: `${_id}`, username, email }));
  const { mutateAsync: createGroup } = trpc.roomRouter.createGroup.useMutation({
    onSuccess: () => onCreateGroup?.()
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      userIds: [],
    },
  });

  const selectedUserIds = watch("userIds");

  return (
    <form onSubmit={handleSubmit(({ name, userIds }) => createGroup({ name, userIds }))}>
      <Input
        label="Group name"
        error={errors?.name?.message}
        {...register("name")}
      />
      {usersList?.length ? (
        <UsersSelector
          users={usersList}
          selectedUsers={selectedUserIds}
          onClickUser={({ id }) => {
            if(selectedUserIds?.includes(id)) {
              setValue("userIds", selectedUserIds?.filter((currentId) => currentId !== id))
            } else {
              setValue("userIds", selectedUserIds?.length ? [...selectedUserIds, id] : [id])
            }
          }}
        />
      ) : <></>}
      <div className="flex w-full justify-center mt-4">
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

export default CreateGroupForm;
