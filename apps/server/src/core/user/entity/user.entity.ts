import { BcryptService } from "@common/auth";
import { Prisma, RoleEnum, User } from "@prisma/client";

export class UserEntity implements Omit<User, "id" | "password"> {
  readonly active: boolean;
  readonly amount_settings: Prisma.JsonValue;
  readonly api_keys: Prisma.JsonValue | null;
  readonly auth_tokens: Prisma.JsonValue;
  readonly balance: number;
  readonly balance_dep: number;
  readonly broker: string | null;
  readonly broker_commissions: Prisma.JsonValue;
  readonly can_finish_orders: boolean;
  readonly can_open_orders_via_panel: boolean;
  readonly crypto_type: string;
  readonly inviter: string | null;
  readonly is_work: boolean;
  readonly name: string;
  readonly password: string;
  readonly percent_method: string;
  readonly role: RoleEnum[];
  readonly send_tx_to_blockchain: boolean | null;
  readonly system_allow: Prisma.JsonValue;
  readonly system_commissions: Prisma.JsonValue;
  readonly tokens: Prisma.JsonValue[];
  readonly wallet: string | null;
  readonly wallet_added: number | null;
  readonly wallet_deposit_check_amount: number | null;

  private readonly b = new BcryptService();
  constructor(private readonly data: Omit<User, "id">) {
    const {
      active,
      amount_settings,
      api_keys,
      auth_tokens,
      balance,
      balance_dep,
      broker,
      broker_commissions,
      can_finish_orders,
      can_open_orders_via_panel,
      crypto_type,
      inviter,
      is_work,
      name,
      password,
      percent_method,
      role,
      send_tx_to_blockchain,
      system_allow,
      system_commissions,
      tokens,
      wallet,
      wallet_added,
      wallet_deposit_check_amount,
    } = data;

    this.active = active;
    this.amount_settings = amount_settings;
    this.api_keys = api_keys;
    this.auth_tokens = auth_tokens;
    this.balance = balance;
    this.balance_dep = balance_dep;
    this.broker = broker;
    this.broker_commissions = broker_commissions;
    this.can_finish_orders = can_finish_orders;
    this.can_open_orders_via_panel = can_open_orders_via_panel;
    this.crypto_type = crypto_type;
    this.inviter = inviter;
    this.is_work = is_work;
    this.name = name;
    this.password = password;
    this.percent_method = percent_method;
    this.role = role;
    this.send_tx_to_blockchain = send_tx_to_blockchain;
    this.system_allow = system_allow;
    this.system_commissions = system_commissions;
    this.tokens = tokens;
    this.wallet = wallet;
    this.wallet_added = wallet_added;
    this.wallet_deposit_check_amount = wallet_deposit_check_amount;
  }
}
