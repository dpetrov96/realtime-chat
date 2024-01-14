import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { trpc } from '@/utils/trpc';
import { Input, Button, UsersSelector } from '@/components';

export type CreateGroupFormProps = {
  onCreateGroup?: () => void;
}

const CreateGroupForm = ({ onCreateGroup }: CreateGroupFormProps) => {
  const { data: users } = trpc.userRouter.getUsers.useQuery();
  const usersList = users?.map(({ _id, username }) => ({ id: `${_id}`, username }));
  const { mutateAsync: createGroup } = trpc.roomRouter.createGroup.useMutation({
    onSuccess: () => onCreateGroup?.()
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
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
              setValue("userIds", [...selectedUserIds, id])
            }
          }}
        />
      ) : <></>}
      <Button type="submit">Create</Button>
    </form>
  )
}

export default CreateGroupForm;
