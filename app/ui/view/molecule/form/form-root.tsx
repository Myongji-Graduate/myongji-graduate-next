'use client';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';
import { FormContext } from './form.context';
import { filterChildrenByType } from '@/app/utils/component.util';
import AlertDestructive from '../alert-destructive/alert-destructive';
import { useToast } from '../toast/use-toast';

export interface FormState {
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  validationError: Record<string, string[] | undefined>;
}

const getFormSubmitButton = (children: React.ReactNode) => {
  return filterChildrenByType(children, FormSubmitButton);
};

interface FormRootProps {
  id: string;
  onSuccess?: () => void;
  action: (prevState: FormState, formData: FormData) => Promise<FormState> | FormState;
  failMessageControl?: 'alert' | 'toast';
}

export function FormRoot({
  id,
  action,
  onSuccess,
  failMessageControl = 'alert',
  children,
}: React.PropsWithChildren<FormRootProps>) {
  const initialState: FormState = { isSuccess: false, isFailure: false, message: null, validationError: {} };
  const [formState, dispatch] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.isSuccess) {
      onSuccess?.();
    }
    if (formState.isFailure && failMessageControl === 'toast') {
      toast({
        title: formState.message ? formState.message : '',
        variant: 'destructive',
      });
    }
  }, [formState]);

  const formSubmitButton = getFormSubmitButton(children);

  const renderWithoutSubmitButton = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child) || child.type === FormSubmitButton) return null;
      if (child.type === FormSubmitButton) return child;
      return <div key={index}>{child}</div>;
    });
  };

  return (
    <FormContext.Provider value={{ errors: formState.validationError, formId: id }}>
      {formState.isFailure && failMessageControl === 'alert' ? (
        <div className="mb-4">
          <AlertDestructive description={formState.message!} />
        </div>
      ) : null}
      <form id={id} action={dispatch}>
        {renderWithoutSubmitButton()}
        {formSubmitButton}
      </form>
    </FormContext.Provider>
  );
}
