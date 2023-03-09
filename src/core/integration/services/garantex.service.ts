import { IHttpService } from "@common/http";
import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";

interface GarantexData {
  id: number;
  price: string;
  volume: string;
  funds: string;
  market: string;
  created_at: string;
}

export interface IGarantexService {
  getBtcPrice(): Promise<number>;
  getUSDTPrice(): Promise<number>;
}
@Injectable()
export class GarantexService implements IGarantexService {
  constructor(@Inject(TYPES.services.HttpService) private readonly httpService: IHttpService) {}
  private readonly urls = {
    BTC: new URL("https://garantex.io/api/v2/trades?market=btcrub&limit=1").toString(),
    USDT: new URL("https://garantex.io/api/v2/trades?market=usdtrub&limit=1").toString(),
  };

  private getPrice(data: [GarantexData]): number {
    return parseInt(data[0].price);
  }

  async getBtcPrice() {
    const data = await this.httpService.get<[GarantexData]>(this.urls.BTC);

    return this.getPrice(data);
  }
  async getUSDTPrice() {
    const data = await this.httpService.get<[GarantexData]>(this.urls.USDT);

    return this.getPrice(data);
  }
}
