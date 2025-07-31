import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from './ui/form-control';
import { Input, InputField } from './ui/input';

interface AuthInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  control: Control<T>;
  errors: any;
}

export function AuthInputField<T extends FieldValues>({
  name,
  label,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  control,
  errors,
}: AuthInputFieldProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          placeholder={placeholder}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
      </Input>
      {errors[name] && (
        <FormControlError>
          <FormControlErrorText>{errors[name]?.message}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}