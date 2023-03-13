// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

import { useFormContext } from '../hooks';

export type FormSubmitButtonProps = Omit<LoadingButtonProps, 'type'>;

/**
 * @description Используется для форм, отображает состояние загрузки, когда форма isSubmitting
 */
export const FormSubmitButton = ({ children, loading }: FormSubmitButtonProps) => {
  const { formState } = useFormContext();
  const isLoading = loading || formState?.isSubmitting;

  return (
    <LoadingButton type="submit" size="small" loading={isLoading} variant="outlined">
      {children}
    </LoadingButton>
  );
};
