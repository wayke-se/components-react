import * as React from 'react';

import { Input, Label, LabelText, Wrapper } from './wrapper';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  children: React.ReactNode;
};

const InputCheckbox = ({ children, ...props }: Props) => {
  const { id } = props;
  return (
    <Wrapper aria-labelledby={id ? `${id}-label` : undefined}>
      <Input
        {...(props as React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >)}
      />
      <Label id={`${id}-label`} htmlFor={id}>
        <LabelText>{children}</LabelText>
      </Label>
    </Wrapper>
  );
};

export default InputCheckbox;
