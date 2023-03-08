import { CryptocurrencyType, Currency, CurrencyType } from "@prisma/client";

import { prisma } from "./client";

export const paymentSystemSeeders: Array<Omit<Currency, "id">> = [
  {
    name: CurrencyType.BTC,
    title: "Bitcoin",
    type: CryptocurrencyType.Cryptocurrency,
  },
  {
    name: CurrencyType.Tether,
    title: "Tether",
    type: CryptocurrencyType.Cryptocurrency,
  },
];

export const createCurrency = () =>
  prisma.$transaction(paymentSystemSeeders.map((data) => prisma.currency.create({ data })));
