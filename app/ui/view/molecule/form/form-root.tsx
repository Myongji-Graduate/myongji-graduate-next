import React from 'react';

type FormRootProps = {};

export function FormRoot({ children }: React.PropsWithChildren<FormRootProps>) {
  const render = () => {
    return React.Children.map(children, (child, index) => {
      return (
        <div key={index} className="mb-4">
          {child}
        </div>
      );
    });
  };

  return <form>{render()}</form>;
}
