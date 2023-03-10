import { ApiProperty } from '@nestjs/swagger';
import { CurrencyType, PercentMethod } from '@prisma/client';

import { UserSettings, UserSettingsWithExcludedFields } from '../types';

export class UserSettingsEntity implements UserSettingsWithExcludedFields {
  @ApiProperty()
  public readonly active: boolean;
  @ApiProperty()
  public readonly broker: string;
  @ApiProperty()
  public readonly canFinishOrders: boolean;
  @ApiProperty()
  public readonly canOpenOrdersViaPanel: boolean;
  @ApiProperty()
  public readonly canViewDirectBalance: boolean;
  @ApiProperty()
  public readonly clientMaxEqualSumOrdersMode: string;
  @ApiProperty()
  public readonly clientMaxEqualSumOrdersOnPeriod: number;
  @ApiProperty()
  public readonly clientMaxEqualSumOrdersTime: number;
  @ApiProperty()
  public readonly cryptoType: CurrencyType;
  @ApiProperty()
  public readonly percentMethod: PercentMethod;

  @ApiProperty()
  public readonly sendTxToBlockchain: boolean;

  constructor(public readonly data: UserSettings) {
    const {
      active = true,
      cryptoType = CurrencyType.BTC,
      percentMethod = PercentMethod.hd,
      canFinishOrders = false,
      canOpenOrdersViaPanel = false,
      canViewDirectBalance = false,
      sendTxToBlockchain = false,
      clientMaxEqualSumOrdersOnPeriod = 0,
      clientMaxEqualSumOrdersTime = 0,
      clientMaxEqualSumOrdersMode = 'fiatAmount',
      broker = '',
    } = data;

    this.active = active;
    this.broker = broker;
    this.canFinishOrders = canFinishOrders;
    this.canOpenOrdersViaPanel = canOpenOrdersViaPanel;
    this.canViewDirectBalance = canViewDirectBalance;
    this.clientMaxEqualSumOrdersMode = clientMaxEqualSumOrdersMode;
    this.clientMaxEqualSumOrdersOnPeriod = clientMaxEqualSumOrdersOnPeriod;
    this.clientMaxEqualSumOrdersTime = clientMaxEqualSumOrdersTime;
    this.cryptoType = cryptoType;
    this.percentMethod = percentMethod;
    this.sendTxToBlockchain = sendTxToBlockchain;
  }

  static get getDefaultSettings(): UserSettingsWithExcludedFields {
    return {
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
      broker: '',
    };
  }
  get getSettings(): UserSettingsWithExcludedFields {
    return {
      active: this.active,
      cryptoType: this.cryptoType,
      percentMethod: PercentMethod.hd,
      canFinishOrders: false,
      canOpenOrdersViaPanel: false,
      canViewDirectBalance: false,
      sendTxToBlockchain: false,
      clientMaxEqualSumOrdersOnPeriod: 0,
      clientMaxEqualSumOrdersTime: 0,
      clientMaxEqualSumOrdersMode: 'fiatAmount',
      broker: '',
    };
  }
}
