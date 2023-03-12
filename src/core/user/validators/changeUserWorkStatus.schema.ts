import { Validator } from '@shared/validators';
import { EditUserSettingsDto } from '@src/core/user/dto';

export const changeUserWorkStatusSchema = Validator.createSchema<EditUserSettingsDto>({
  body: {
    isWork: Validator.boolean().required(),
  },
});
