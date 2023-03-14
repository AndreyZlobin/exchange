import {
  ActionCell,
  Actions,
  DataGrid,
  DataGridColumns,
  DataGridPagination,
  EyeFillMd,
  SendOutlineMd,
} from '@astral/ui';
import { Page } from '@components/ui/Page';

export const Users = () => {
  type DataType = {
    id: string;
    documentName: string;
    direction: string;
    createDate: string;
  };

  const ACTIONS: Actions<DataType> = {
    main: [
      {
        icon: <EyeFillMd />,
        name: 'Просмотреть',
        onClick: () => console.log('main'),
      },
      {
        icon: <SendOutlineMd />,
        nested: true,
        name: 'Отправить',
        actions: [
          { name: 'Туда', onClick: () => console.log('nested 1') },
          { name: 'Сюда', onClick: () => console.log('nested 2') },
        ],
      },
    ],
    secondary: [
      { name: 'Редактировать', onClick: () => console.log('secondary 1') },
      { name: 'Удалить', onClick: () => console.log('secondary 2') },
    ],
  };
  const columns: DataGridColumns<DataType>[] = [
    {
      field: 'documentName',
      label: 'Логин',
      sortable: true,
      format: () => '',
    },
    {
      field: 'direction',
      label: 'Посредник',
      sortable: true,
      format: () => '',
    },
    {
      field: 'createDate',
      label: 'Пригласил',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Роль',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Баланс',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Ключи API',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Лимит закрытия',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Метод',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Трафик',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Завершение',
      field: 'createDate',
      sortable: true,
      format: () => '',
    },
    {
      label: 'Роль',
      sortable: false,
      align: 'center',
      width: '1%',
      renderCell: (row) => <ActionCell actions={ACTIONS} row={row} />,
    },
  ];

  type SortField = 'documentName' | 'direction' | 'createDate';
  return (
    <Page isSecondElementStretched>
      <Page.header title="Список пользователей" />
      <Page.content withTableContent>
        <DataGrid<DataType, SortField>
          keyId="id"
          rows={Array.from({ length: 10 }, (el, index) => {
            return {
              id: `${index}`,
              documentName: 'Документ 1',
              direction: 'ФНС',
              createDate: '2022-03-24T17:50:40.206Z',
            };
          })}
          columns={columns}
          minDisplayRows={10}
          onRowClick={() => {}}
          loading={false}
          Footer={<DataGridPagination totalCount={10} onChange={() => {}} page={1} />}
        />
      </Page.content>
    </Page>
  );
};
