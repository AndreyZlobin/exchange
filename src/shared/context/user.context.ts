import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class UserContext {
  userId: string;
  username: string;

  user: unknown;

  setUserId(id: string) {
    this.userId = id;
  }

  setUser(user: unknown) {
    this.user = user;
  }

  setUsername(name: string) {
    this.username = name;
  }
}
