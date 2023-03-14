import { LocalStorageAdapter } from '@services/storage/Adapters';

import { IStorageService } from './types';

export class StorageService<Value> implements IStorageService<Value> {
  #adapter: IStorageService<Value>;

  constructor(adapter: IStorageService<Value>) {
    this.#adapter = adapter;
  }

  getItem(key: string): Promise<Value | null> {
    return this.#adapter.getItem(key);
  }

  clearItem(key: string): void {
    return this.#adapter.clearItem(key);
  }

  getItemSync(key: string): Value | null {
    return this.#adapter.getItemSync(key);
  }

  setItem(key: string, value: string): Promise<void> {
    return this.#adapter.setItem(key, value);
  }

  setItemSync(key: string, value: string): void {
    return this.#adapter.setItemSync(key, value);
  }

  clear() {
    this.#adapter.clear();
  }
}

export const storageService = new StorageService(new LocalStorageAdapter());
