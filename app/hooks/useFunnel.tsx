import React, { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_STEP_QUERY_KEY = 'funnel-step';

export default function useFunnel<Steps extends string>(
  defaultStep: Steps,
  options?: {
    stepQueryKey?: string;
  },
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  const step = searchParams.get(stepQueryKey) as Steps | undefined;

  const createUrl = useCallback(
    (step: Steps) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(stepQueryKey);
      params.set(stepQueryKey, step);
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, stepQueryKey],
  );

  const setStep = useCallback(
    (step: Steps) => {
      router.replace(createUrl(step));
    },
    [searchParams, createUrl],
  );

  useEffect(() => {
    setStep(step ?? defaultStep);
  }, [defaultStep, step, setStep]);

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
