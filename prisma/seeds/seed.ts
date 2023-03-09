import { prisma } from "./client";
import { createCurrency } from "./currency.seed";
import { createPaymentSystem } from "./payment.seed";

const createSeed = async (key: string, cb: () => Promise<unknown>) => {
  try {
    const data = await cb();

    // eslint-disable-next-line no-console
    console.log(`[seed]: ${key} has been seeded, ${JSON.stringify(data || {}, null, 2)}`);
  } catch (e) {
    return Promise.reject(e);
  }
};

async function main() {
  await Promise.all([
    createSeed("paymentSystem", createPaymentSystem),
    createSeed("currency", createCurrency),
  ]);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
