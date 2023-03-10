import { object, string } from 'yup';

export const registerSchema = object({
  body: object({
    name: string().required('Name is required field'),
    password: string()
      .min(6, { min: 'Password must be greater 6 symbols' })
      .max(24, { max: 'Password must be less 24 symbols' })
      .required(),
  }),
});
