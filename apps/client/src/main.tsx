import { App } from './app/app';
import { Form } from './components/form/Form';
import { FormSubmitButton } from './components/form/FormSubmitButton';
import { FormTextField } from './components/form/FormTextField';
import { useForm } from './components/form/hooks';
const handle = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1300);
  });

export function Main() {
  const form = useForm<{ name: string; password: string }>({
    defaultValues: { name: '', password: '' },
  });
  const onSubmit = async (data: any) => {
    await handle();
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)} form={form}>
        <FormTextField
          required
          label="Form text field"
          control={form.control}
          name="name"
          rules={{ required: 'Обязательное поле' }}
          helperText="Это поле отражает всю суть текстовых полей"
        />
        <FormTextField
          required
          label="Form text field"
          control={form.control}
          name="password"
          rules={{ required: 'Обязательное поле' }}
          helperText="Это поле отражает всю суть текстовых полей"
        />
        <FormSubmitButton>Submit</FormSubmitButton>
      </Form>
      <App />
    </>
  );
}
