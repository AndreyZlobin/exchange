export const ROLES = {
  superadmin: 'Суперадмин',
  admin: 'Админ',
  broker: 'Посредник',
  provider: 'Поставщик',
  seller: 'Продавец',
  support: 'Поддержка',
};
export const getRoleTitle = (role: string) => ROLES[role as keyof typeof ROLES];

export const PAYMENT_SYSTEMS = {
  card: 'Карты',
  sim: 'Сим',
  yandex: 'Яндекс',
  qiwi: 'QIWI',
};
export const getPaymentSystemTitle = (role: string) =>
  PAYMENT_SYSTEMS[role as keyof typeof PAYMENT_SYSTEMS];
