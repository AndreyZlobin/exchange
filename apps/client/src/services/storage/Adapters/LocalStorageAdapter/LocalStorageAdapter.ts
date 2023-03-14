import { IStorageService } from '../../types';

export class LocalStorageAdapter implements IStorageService<string> {
  readonly #storage: Storage;

  constructor() {
    this.#storage = localStorage;
  }

  public clearItem(key: string): void {
    this.#storage.removeItem(key);
  }

  public getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => resolve(this.getItemSync(key)));
  }

  public getItemSync(key: string): string | null {
    let value;

    try {
      value = this.#storage.getItem(key);
    } catch (e) {
      value = null;
    }

    return value;
  }

  public setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve) => resolve(this.setItemSync(key, value)));
  }

  public setItemSync(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }

  public clear() {
    this.#storage.clear();
  }
}
