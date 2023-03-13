import { CurrencyType, PercentMethod } from '@prisma/client';
import { CreateUserSettingsDto } from '@src/core/user/dto';
import { mergeDeep } from '@src/utils/mergeDeep';

const DEFAULT_SETTINGS: CreateUserSettingsDto = {
  active: true,
  cryptoType: CurrencyType.BTC,
  percentMethod: PercentMethod.hd,
  canFinishOrders: false,
  canOpenOrdersViaPanel: false,
  canViewDirectBalance: false,
  sendTxToBlockchain: false,
  clientMaxEqualSumOrdersOnPeriod: 0,
  clientMaxEqualSumOrdersTime: 0,
  clientMaxEqualSumOrdersMode: 'fiatAmount',
  isWork: false,
  broker: '',
};

export class UserSettingsEntity {
  constructor(private readonly data: Partial<CreateUserSettingsDto>) {
    this.data = data;
  }

  static get getDefaultSettings(): CreateUserSettingsDto {
    return DEFAULT_SETTINGS;
  }

  get settings() {
    return mergeDeep(DEFAULT_SETTINGS, this.data);
  }
}
