import React from 'react';

type FormRootProps = {};

export function FormRoot({ children }: React.PropsWithChildren<FormRootProps>) {
  return <form>{children}</form>;
}
