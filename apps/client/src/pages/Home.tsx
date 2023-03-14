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

import { apiClient } from '../core/apiClient/apiClient';
type DataType = {
  id: string;
  documentName: string;
  direction: string;
  createDate: string;
};
export const Home = () => {
  const onSubmit = async () => {
    try {
      const res = await apiClient.wallet.walletControllerGetUserWallet({});

      console.log(res);
    } catch (e) {
      return Promise.reject(e);
    }
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
      label: 'Наименование документа',
      sortable: true,
    },
    {
      field: 'direction',
      label: 'Направление',
      sortable: true,
    },
    {
      field: 'createDate',
      label: 'Дата создания',
      sortable: true,
      format: ({ createDate }) => new Date(createDate).toLocaleDateString(),
    },
    {
      label: 'Действия',
      sortable: false,
      align: 'center',
      width: '1%',
      renderCell: (row) => <ActionCell actions={ACTIONS} row={row} />,
    },
  ];

  type SortField = 'documentName' | 'direction' | 'createDate';
  return (
    <Page isSecondElementStretched>
      <Page.header title="Список заявок" actions={<button onClick={onSubmit}>get wallet</button>} />
      <Page.content withTableContent>
        <DataGrid<DataType, SortField>
          keyId="id"
          rows={[
            {
              id: '1',
              documentName: 'Документ 1',
              direction: 'ФНС',
              createDate: '2022-03-24T17:50:40.206Z',
            },
          ]}
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
