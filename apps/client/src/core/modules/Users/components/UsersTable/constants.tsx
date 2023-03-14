import { DataGridColumns } from '@astral/ui';
import { getRoleTitle } from '@constants/global';
import { UserTableActionCell } from '@modules/Users/components/UsersTable/UserTableActionCell';
import { UserDto } from '@src/core/api';

export const USER_TABLE_COLUMNS: DataGridColumns<UserDto>[] = [
  {
    field: 'name',
    label: 'Логин',
    sortable: true,
  },
  {
    field: 'settings',
    label: 'Посредник',
    format: ({ settings }) => settings.broker,
  },
  {
    field: 'settings',
    label: 'Пригласил',
    format: () => '',
  },
  {
    label: 'Роль',
    field: 'role',
    sortable: false,
    format: ({ role }) => getRoleTitle(role),
  },
  {
    label: 'Баланс',
    field: 'settings',
    sortable: true,
    format: ({ id }) => id,
  },
  {
    label: 'Ключи API',
    field: 'settings',
    sortable: true,
    format: () => '',
  },
  {
    label: 'Лимит закрытия',
    field: 'settings',
    sortable: true,
    format: () => '',
  },
  {
    label: 'Метод',
    field: 'settings',
    sortable: true,
    format: ({ settings }) => settings.percentMethod,
  },
  {
    label: 'Активен',
    field: 'settings',
    sortable: true,
    format: ({ settings }) => `${settings.active}`,
  },
  {
    label: 'Трафик',
    field: 'settings',
    sortable: true,
    format: ({ settings }) => `${settings.isWork}`,
  },
  {
    label: 'Завершение',
    field: 'settings',
    sortable: true,
    format: ({ settings }) => `${settings.canFinishOrders}`,
  },
  {
    label: 'Действия',
    sortable: false,
    align: 'center',
    width: '1%',
    renderCell: UserTableActionCell,
  },
];
