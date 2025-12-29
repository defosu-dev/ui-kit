export type InputType = 'text' | 'password' | 'number' | 'email';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  clearable?: boolean;
}
