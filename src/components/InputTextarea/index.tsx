import React from 'react';

import { Textarea, Wrapper } from './wrapper';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  label: string;
};

const InputTextarea = ({ label, ...props }: Props) => (
  <Wrapper>
    <Textarea aria-label={label} {...props} />
  </Wrapper>
);

export default InputTextarea;
