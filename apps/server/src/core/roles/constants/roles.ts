import { RoleEnum } from "@prisma/client";

export type Roles = (typeof RoleEnum)[keyof typeof RoleEnum];
export const ROLES: Record<Roles, Roles> = Object.freeze({
  admin: "admin", // Обычный админ
  broker: "broker", // Посредник
  provider: "provider", // Поставщик трафика
  seller: "seller", // Продавец (поставщик реквизитов)
  superadmin: "superadmin", // Суперадмин
  support: "support", // Поддержка
});
