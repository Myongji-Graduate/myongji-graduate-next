import React from 'react';
import { useState } from 'react';

export default function useFunnel<Steps>(defaultStae: Steps) {
  const [step, setStep] = useState<Steps>(defaultStae);

  const Step = ({ name, children }: React.PropsWithChildren<{ name: Steps }>) => {
    return <>{children}</>;
  };

  const FunnelRoot = ({ children }: React.PropsWithChildren) => {
    const targetStep = React.Children.toArray(children).find((childStep) => {
      return React.isValidElement(childStep) && childStep.props.name === step;
    });

    return <>{targetStep}</>;
  };

  const Funnel = Object.assign(FunnelRoot, { Step });

  return { Funnel, setStep };
}
