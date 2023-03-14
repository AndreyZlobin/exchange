import { FormSubmitButton, FormTextField, IconButton, Typography, useForm } from '@astral/ui';
import { FormPasswordField } from '@components/form/FormPasswordField';
import { AuthContext } from '@modules/Auth/components/AuthContext';
import { UserLoginDto } from '@src/core/api';
import { useContext } from 'react';

import { AuthFormGrid, AuthFormWrapper } from './styles';

export const LoginForm = () => {
  const form = useForm<UserLoginDto>({
    defaultValues: { name: '', password: '' },
    // validateSchema: loginSchema,
  });
  // form.
  const { handleLogin, isLoginLoading } = useContext(AuthContext);

  const onSubmit = async (data: UserLoginDto) => {
    try {
      await handleLogin(data);
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthFormWrapper>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-ignore*/}
      <AuthFormGrid onSubmit={form.handleSubmit(onSubmit)} form={form}>
        <Typography variant="h1">Авторизация</Typography>
        <FormTextField
          control={form.control}
          label="Имя"
          name="name"
          rules={{ required: 'Обязательное поле' }}
        />
        <FormPasswordField
          control={form.control}
          label="Пароль"
          name="password"
          rules={{ required: 'Обязательное поле' }}
        />
        <FormSubmitButton loading={isLoginLoading}>Войти</FormSubmitButton>
      </AuthFormGrid>
    </AuthFormWrapper>
  );
};
