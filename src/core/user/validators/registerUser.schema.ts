import { Validator } from '@shared/validators';
import { ROLES } from '@src/core/roles/constants';

import { CreateUserDto } from '../dto';

export const registerUserSchema = () => {
  return Validator.createSchema<CreateUserDto>({
    body: {
      name: Validator.string().required(),
      password: Validator.string()
        .min(6, { min: 'Password must be greater 6 symbols' })
        .max(24, { max: 'Password must be less 24 symbols' })
        .required(),
      role: Validator.string().oneOf(Object.values(ROLES)),
    },
  });
};
