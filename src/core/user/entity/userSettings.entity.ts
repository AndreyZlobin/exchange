import { CurrencyType, PercentMethod } from "@prisma/client";

import { UserSettings, UserSettingsWithExcludedFields } from "../types";

export class UserSettingsEntity implements UserSettingsWithExcludedFields {
  public readonly active: boolean;
  public readonly broker: string;
  public readonly canFinishOrders: boolean;
  public readonly canOpenOrdersViaPanel: boolean;
  public readonly canViewDirectBalance: boolean;
  public readonly clientMaxEqualSumOrdersMode: string;
  public readonly clientMaxEqualSumOrdersOnPeriod: number;
  public readonly clientMaxEqualSumOrdersTime: number;
  public readonly cryptoType: CurrencyType;
  public readonly percentMethod: PercentMethod;
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
      clientMaxEqualSumOrdersMode = "fiatAmount",
      broker = "",
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
      clientMaxEqualSumOrdersMode: "fiatAmount",
      broker: "",
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
      clientMaxEqualSumOrdersMode: "fiatAmount",
      broker: "",
    };
  }
}
