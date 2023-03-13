import { Role } from '../types';

export const ROLES: Record<Role, Role> = Object.freeze({
  admin: 'admin', // Обычный админ
  broker: 'broker', // Посредник
  provider: 'provider', // Поставщик трафика
  seller: 'seller', // Продавец (поставщик реквизитов)
  superadmin: 'superadmin', // Суперадмин
  support: 'support', // Поддержка
});
