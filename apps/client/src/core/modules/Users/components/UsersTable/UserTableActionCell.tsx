import { EyeFillMd } from '@astral/ui';
import { EditIcon } from '@components/common/Icons';
import { ActionButton } from '@components/ui/ActionButton';
import { ActionsStack } from '@components/ui/ActionsStack';
import { useFetchUser } from '@modules/Users/api/useFetchUser';
import { useEffect, useState } from 'react';
export const UserTableActionCell = ({ id }: { id: string }) => {
  const [isFetching, setIsFetching] = useState(false);

  const { isLoading, data, refetch } = useFetchUser(id, isFetching);

  const handleEdit = () => {
    if (!isLoading) {
      return refetch();
    }
    setIsFetching(true);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setIsFetching(false);
    }
  }, [data, isLoading]);

  return (
    <ActionsStack>
      <ActionButton icon={<EyeFillMd />} />
      <ActionButton onClick={handleEdit} icon={<EditIcon />} />
    </ActionsStack>
  );
};
