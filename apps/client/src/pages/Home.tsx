import { Form, FormSubmitButton, FormTextField, useForm } from '@astral/ui';
import { notify } from '@utils/notify';

import { apiClient } from '../core/apiClient/apiClient';

export const Home = () => {
  const form = useForm<{ name: string; password: string }>({
    defaultValues: { name: '', password: '' },
  });
  const handleAuth = async () => {
    notify.warning(1);
    await apiClient.auth.authControllerLogin({
      requestBody: { name: 'test_test33', password: 'test_test' },
    });
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    await handleAuth();
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} form={form}>
      <FormTextField
        required
        control={form.control}
        name="name"
        placeholder="Имя"
        rules={{ required: 'Обязательное поле' }}
      />
      <FormTextField
        required
        placeholder="Пароль"
        control={form.control}
        name="password"
        rules={{ required: 'Обязательное поле' }}
      />
      <FormSubmitButton>Войти</FormSubmitButton>
    </Form>
  );
};
