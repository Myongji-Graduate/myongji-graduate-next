import React, { useCallback, useEffect, useMemo } from 'react';
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

  const stepQueryValue = searchParams.get(stepQueryKey) as Steps | null;

  const step = (stepQueryValue ?? defaultStep) as Steps;

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
      router.push(createUrl(step));
    },
    [searchParams, createUrl],
  );

  useEffect(() => {
    if (!stepQueryValue) {
      router.replace(createUrl(defaultStep));
    }
  }, [defaultStep, stepQueryValue, setStep]);

  const Step = useCallback(({ name, children }: React.PropsWithChildren<{ name: Steps }>) => {
    return <>{children}</>;
  }, []);

  const FunnelRoot = useCallback(
    ({ children }: React.PropsWithChildren) => {
      const targetStep = React.Children.toArray(children).find((childStep) => {
        return React.isValidElement(childStep) && childStep.props.name === step;
      });

      return <>{targetStep}</>;
    },
    [step],
  );

  const Funnel = useMemo(() => Object.assign(FunnelRoot, { Step }), [FunnelRoot, Step]);

  return { Funnel, setStep };
}
