import { PaymentSystemEnum } from '@prisma/client';
import { Validator } from '@shared/validators';

export const createOrderSchema = Validator.createSchema<any>({
  body: {
    paymentSystem: Validator.string().oneOf(Object.values(PaymentSystemEnum)),
  },
});
