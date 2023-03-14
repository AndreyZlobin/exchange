import { TextField } from '@astral/components';
import { FieldValues, FormTextFieldProps, IconButton, useFormFieldProps } from '@astral/ui';
import { InputAdornment } from '@mui/material';
import { FocusEvent, useState } from 'react';

/**
 * @description Адаптер для FormPasswordField
 */
export function FormPasswordField<TFieldValues extends FieldValues>({
  trimmed = true,
  ...props
}: FormTextFieldProps<TFieldValues>) {
  const fieldProps = useFormFieldProps<FormTextFieldProps<TFieldValues>, TFieldValues>(props);

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (trimmed) {
      fieldProps.onChange(event.target.value?.trim());
    }

    fieldProps.onBlur();
    props.onBlur?.(event);
  };
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleToggleType = () => {
    setType((prev) => {
      if (prev === 'password') return 'text';
      return 'password';
    });
  };

  return (
    <TextField
      {...fieldProps}
      type={type}
      onBlur={handleOnBlur}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton variant="text" onClick={handleToggleType}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                  fill="#072D57"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                  fill="#072D57"
                />
              </svg>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
