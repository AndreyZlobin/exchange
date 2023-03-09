import { compare, hash } from "bcrypt";
import { injectable } from "inversify";

export interface IBcryptService {
  hash: (plaintext: string) => Promise<string>;
  compare(plaintext: string, digest: string): Promise<boolean>;
}

@injectable()
export class BcryptService implements IBcryptService {
  // toDo
  private readonly salt = 12;

  async hash(plaintext: string): Promise<string> {
    return hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
