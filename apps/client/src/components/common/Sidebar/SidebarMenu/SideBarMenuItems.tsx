import { DocumentsOutlineIcon, PeoplesIcon } from '@components/common/Icons';
import { createMenuItem } from '@src/router/utils/createMenuItem';

export const MENU = [
  createMenuItem({
    icon: <DocumentsOutlineIcon height={24} width={24} />,
    title: 'Заявки',
    path: '/orders',
    name: 'orders',
  }),
  createMenuItem({
    icon: <PeoplesIcon height={24} width={24} />,
    title: 'Пользователи',
    path: 'users',
    name: 'users',
  }),
];
