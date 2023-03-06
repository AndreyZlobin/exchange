import { User as ModelUser } from "@prisma/client";

export type User = ModelUser;
export type UserWithExcludedFields = Omit<User, "id" | "deleted">;
export type UserWithoutPassword = Omit<User, "password">;
