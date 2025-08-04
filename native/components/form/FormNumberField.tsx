import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '../ui/form-control';
import { Input, InputField } from '../ui/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AlertCircleIcon } from '../ui/icon';

interface FormNumberFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  control: Control<T>;
  className?: string;
}

export function FormNumberField<T extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  control,
  className,
}: FormNumberFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => {
        const error = errors[name]?.message as string | undefined;
        return (
          <FormControl isInvalid={!!error} className={className}>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={(text) => onChange(Number(text))}
                value={value?.toString()}
                keyboardType="numeric"
              />
            </Input>
            {helperText && !error && (
              <FormControlHelper>
                <FormControlHelperText>{helperText}</FormControlHelperText>
              </FormControlHelper>
            )}
            {error && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        );
      }}
    />
  );
}