import React from 'react';
import { useFormState } from 'react-dom';
import { FormSubmitButton } from './form-submit-button';

type State = {
  message: string | null;
  errors: Record<string, string>;
};

export const filterChildrenByType = (children: React.ReactNode, elementType: React.ElementType) => {
  const childArray = React.Children.toArray(children);
  return childArray.filter((child) => React.isValidElement(child) && child.type === elementType);
};

const getFormSubmitButton = (children: React.ReactNode) => {
  return filterChildrenByType(children, FormSubmitButton);
};

type FormRootProps = {
  id: string;
  action: (prevState: State, formData: FormData) => State;
};

export function FormRoot({ id, action, children }: React.PropsWithChildren<FormRootProps>) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(action, initialState);

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
    <form id={id} action={dispatch}>
      {renderWithoutSubmitButton()}
      <div className="mt-8">{formSubmitButton}</div>
    </form>
  );
}
