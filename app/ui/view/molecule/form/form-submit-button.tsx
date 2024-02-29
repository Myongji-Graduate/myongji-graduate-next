import clsx from 'clsx';
import Button from '../../atom/button/button';
import { useContext } from 'react';
import { FormContext } from './form.context';

type FormSubmitButtonProps = {
  label: string;
  position?: 'left' | 'right' | 'center';
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default';
};

export function FormSubmitButton({
  label,
  position = 'right',
  variant = 'primary',
  size = 'md',
}: FormSubmitButtonProps) {
  const { formId } = useContext(FormContext);
  return (
    <div
      className={clsx('flex', {
        'justify-start': position === 'left',
        'justify-center': position === 'center',
        'justify-end': position === 'right',
      })}
    >
      <Button aria-label="submit-button" form={formId} size={size} variant={variant} type="submit" label={label} />
    </div>
  );
}
