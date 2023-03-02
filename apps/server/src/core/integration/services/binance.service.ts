import { IHttpService } from "@common/http";
import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";

export interface BinanceData {
  symbol: string;
  price: string;
}

export interface IBinanceService {
  getBtcPrice(): Promise<number>;
  getXMRPrice(): Promise<number>;
}

@Injectable()
export class BinanceService implements IBinanceService {
  constructor(@Inject(TYPES.services.HttpService) private readonly httpService: IHttpService) {}
  private readonly urls = {
    BTC: new URL("https://api.binance.com/api/v3/ticker/price?symbol=BTCRUB").href,
    XMR: new URL("https://api.binance.com/api/v3/ticker/price?symbol=XMRUSDT").href,
  };

  private getPrice(data: BinanceData): number {
    return parseInt(data.price);
  }

  async getBtcPrice() {
    const data = await this.httpService.get<BinanceData>(this.urls.BTC);

    return this.getPrice(data);
  }
  async getXMRPrice() {
    const data = await this.httpService.get<BinanceData>(this.urls.XMR);

    return this.getPrice(data);
  }
}
