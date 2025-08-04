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
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '../ui/select';
import { ChevronDownIcon, AlertCircleIcon } from '../ui/icon';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  control: Control<T>;
  options: Option[];
  className?: string;
}

export function FormSelectField<T extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  control,
  options,
  className,
}: FormSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, formState: { errors } }) => {
        const error = errors[name]?.message as string | undefined;
        return (
          <FormControl isInvalid={!!error} className={className}>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={onChange} selectedValue={value}>
              <SelectTrigger className="w-full flex justify-between">
                <SelectInput className="py-2" placeholder={placeholder} />
                <SelectIcon as={ChevronDownIcon} className='mr-3' />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {options.map((option) => (
                    <SelectItem key={option.value} label={option.label} value={option.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
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