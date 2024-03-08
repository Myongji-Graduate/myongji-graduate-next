import React from 'react';
import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';
import { FormContext } from './form.context';
import { filterChildrenByType } from '@/app/utils/component.util';

export interface FormState {
  isFailure: boolean;
  message: string | null;
  validationError: Record<string, string[] | undefined>;
}

const getFormSubmitButton = (children: React.ReactNode) => {
  return filterChildrenByType(children, FormSubmitButton);
};

interface FormRootProps {
  id: string;
  action: (prevState: FormState, formData: FormData) => Promise<FormState> | FormState;
}

export function FormRoot({ id, action, children }: React.PropsWithChildren<FormRootProps>) {
  const initialState: FormState = { isFailure: false, message: null, validationError: {} };
  const [formState, dispatch] = useFormState(action, initialState);

  const formSubmitButton = getFormSubmitButton(children);

  const renderWithoutSubmitButton = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child) || child.type === FormSubmitButton) return null;
      if (child.type === FormSubmitButton) return child;
      return (
        <div key={index} className="mb-4">
          {child}
        </div>
      );
    });
  };

  return (
    <FormContext.Provider value={{ errors: formState.validationError, formId: id }}>
      <form id={id} action={dispatch}>
        {renderWithoutSubmitButton()}
        <div className="mt-8">{formSubmitButton}</div>
      </form>
    </FormContext.Provider>
  );
}
