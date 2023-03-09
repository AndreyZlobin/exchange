export interface IDataBaseService {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}
