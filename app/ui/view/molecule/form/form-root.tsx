import React from 'react';
import { useFormState } from 'react-dom';

type State = {
  message: string | null;
  errors: Record<string, string>;
};

type FormRootProps = {
  action: (prevState: State, formData: FormData) => State;
};

export function FormRoot({ action, children }: React.PropsWithChildren<FormRootProps>) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(action, initialState);

  const render = () => {
    return React.Children.map(children, (child, index) => {
      return (
        <div key={index} className="mb-4">
          {child}
        </div>
      );
    });
  };

  return <form action={dispatch}>{render()}</form>;
}
