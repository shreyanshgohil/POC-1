import { ChangeEvent } from 'react';
import { FormInput } from '@/types/InputTypes';

export interface DynamicInput {
  singleFieldData: FormInput;
  handleUserDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}
