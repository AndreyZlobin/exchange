import { DataGrid, DataGridPagination } from '@astral/ui';
import { useFetchUsers } from '@modules/Users/api/useFetchUsers';
import { UserDto } from '@src/core/api';

import { USER_TABLE_COLUMNS } from './constants';
export const UsersTable = () => {
  const { data = [], isLoading } = useFetchUsers();

  type SortField = 'settings';

  return (
    <DataGrid<UserDto, SortField>
      keyId="id"
      rows={data}
      columns={USER_TABLE_COLUMNS}
      minDisplayRows={10}
      onRowClick={() => {}}
      loading={isLoading}
      Footer={<DataGridPagination totalCount={10} onChange={() => {}} page={1} />}
    />
  );
};
