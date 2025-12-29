export type InputType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'tel'
  | 'url';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  clearable?: boolean;
  error?: string;
  label?: string;
}
