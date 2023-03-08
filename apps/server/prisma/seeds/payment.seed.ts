import { PaymentSystem, SystemEnum } from "@prisma/client";

import { prisma } from "./client";

export const paymentSystemSeeders: Array<Omit<PaymentSystem, "id">> = [
  {
    name: SystemEnum.card,
    type: SystemEnum.card,
    min: 300,
    max: 15000,
    brokerCommission: 0,
    systemCommission: 20,
    authToken: "НЕ УСТАНОВЛЕН",
    apiKey: "",
    isAllow: true,
  },
  {
    name: SystemEnum.yandex,
    type: SystemEnum.yandex,
    min: 300,
    max: 15000,
    brokerCommission: 0,
    systemCommission: 20,
    authToken: "НЕ УСТАНОВЛЕН",
    apiKey: "",
    isAllow: true,
  },
  {
    name: SystemEnum.qiwi,
    type: SystemEnum.qiwi,
    min: 300,
    max: 15000,
    brokerCommission: 0,
    systemCommission: 20,
    authToken: "НЕ УСТАНОВЛЕН",
    apiKey: "",
    isAllow: true,
  },
  {
    name: SystemEnum.sim,
    type: SystemEnum.sim,
    min: 300,
    max: 15000,
    brokerCommission: 0,
    systemCommission: 20,
    authToken: "НЕ УСТАНОВЛЕН",
    apiKey: "",
    isAllow: true,
  },
];

export const createPaymentSystem = () =>
  prisma.$transaction(paymentSystemSeeders.map((data) => prisma.paymentSystem.create({ data })));
