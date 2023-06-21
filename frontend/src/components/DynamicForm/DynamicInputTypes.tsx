import { ChangeEvent } from 'react';
import { FormInput } from '@/Global/interfaces/InputTypes';

export interface DynamicInput {
  singleFieldData: FormInput;
  handleUserDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}
