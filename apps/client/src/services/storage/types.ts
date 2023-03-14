export interface IStorageService<T> {
  getItem(key: string): Promise<T | null>;
  getItemSync(key: string): T | null;
  setItem(key: string, value: string): Promise<void>;
  setItemSync(key: string, value: string): void;
  clearItem(key: string): void;
  clear(): void;
}
